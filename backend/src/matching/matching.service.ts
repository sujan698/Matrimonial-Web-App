import { Injectable } from '@nestjs/common';
import { Religion } from '@prisma/client';
import { single } from 'rxjs';
import { DemographicDetail } from 'src/demographic-details/entities/demographic-detail.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchingService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMatches(userId: number) {
    const currentUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        PartnerPreference: true,
        DemographicDetails: {
          include: {
            district: true,
          },
        },
        FamilyDetails: true,
        Interest: true,
        UploadPhoto: true,
      },
    });
    if (!currentUser) throw new Error('User not found');

    const likedProfiles = await this.prismaService.like.findMany({
      where: {
        userId: userId,
      },
      select: {
        likedId: true,
      },
    });
    const likedProfilesIds = likedProfiles.map((like) => like.likedId);

    const PartnerPreference = currentUser.PartnerPreference[0];

    const genderFilter = this.getGenderFilter(currentUser.gender);
    const maritalStatusFilter = PartnerPreference?.maritalStatus;
    const religionFilter =
      PartnerPreference?.religion !== 'NoPreference'
        ? PartnerPreference?.religion
        : undefined;

    const candidates = await this.prismaService.user.findMany({
      where: {
        id: { not: userId, notIn: likedProfilesIds },
        gender: genderFilter,
        DemographicDetails: {
          some: {
            maritalStatus: maritalStatusFilter,
          },
        },
        FamilyDetails: {
          some: {
            religion: religionFilter,
          },
        },
      },
      include: {
        PartnerPreference: true,

        DemographicDetails: {
          include: {
            district: true,
          },
        },

        FamilyDetails: true,
        Interest: true,
        UploadPhoto: true,
      },
    });
    //calculate score for each candidate

    const matches = candidates.map((candidate) => ({
      ...candidate,
      score: this.calculateTotalScore(currentUser, candidate),
    }));

    //sort by score descending

    return matches.sort((a, b) => b.score - a.score);
  }
  private getGenderFilter(userGender: string) {
    switch (userGender) {
      case 'Male':
        return 'Female';
      case 'Female':
        return 'Male';
      default:
        return undefined;
    }
  }

  private calculateTotalScore(currentUser: any, candidate: any) {
    const prefScoreAB = this.calculatePreferenceScore(
      currentUser.PartnerPreference[0],
      candidate,
    );

    const prefScoreBA = this.calculatePreferenceScore(
      candidate.PartnerPreference[0],
      currentUser,
    );

    const interestSimilarity = this.calculateInterestSimilarity(
      currentUser.Interest,
      candidate.Interest,
    );

    return ((prefScoreAB + prefScoreBA) / 2) * 0.7 + interestSimilarity * 0.3; //weighted average
  }
  private calculatePreferenceScore(preferences: any, profile: any) {
    const attributes = [
      {
        pref: preferences.dietPreferences,
        profile: profile.DemographicDetails.dietPreferences,
      },

      {
        pref: preferences.familyValues,
        profile: profile.FamilyDetails.familyValues,
      },
      { pref: preferences.ethnicity, profile: profile.FamilyDetails.ethnicity },
      {
        pref: preferences.familyclass,
        profile: profile.FamilyDetails.familyclass,
      },
      {
        pref: preferences.residantalstatus,
        profile: profile.DemographicDetails.residantalstatus,
      },
      {
        pref: preferences.employmentstatus,
        profile: profile.DemographicDetails.employmentstatus,
      },
      {
        pref: preferences.educationlevel,
        profile: profile.DemographicDetails.educationlevel,
      },

      { ageMatch: this.checkAgeMatch(preferences.ageRange, profile.dob) }, //age
    ];

    const matches = attributes.filter((attr) =>
      attr.ageMatch ? attr.ageMatch : attr.pref === attr.profile,
    ).length;
    return Math.sqrt(matches) / Math.sqrt(10); //cosine
  }
  //for age calculation

  private checkAgeMatch(preferredAge: number, dob: string) {
    const age = this.calculateAge(dob);
    return Math.abs(age - preferredAge) <= 5;
  }

  private calculateAge(dob: string) {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    )
      age--;
    return age;
  }

  //for interest

  private calculateInterestSimilarity(interestA: any[], interestB: any[]) {
    const a = interestA.map((i) => i.interest);
    const b = interestB.map((i) => i.interest);

    const allInterests = [...new Set([...a, ...b])];

    const vectorA = allInterests.map((i) => (a.includes(i) ? 1 : 0));
    const vectorB = allInterests.map((i) => (b.includes(i) ? 1 : 0));

    const dotProduct = vectorA.reduce(
      (sum, val, i) => sum + val * vectorB[i],
      0,
    );
    const magnitudeA = Math.sqrt(
      vectorA.reduce((sum, val) => sum + val * val, 0),
    );
    const magnitudeB = Math.sqrt(
      vectorB.reduce((sum, val) => sum + val * val, 0),
    );

    const matchFeed =
      magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;

    return matchFeed;
  }
}
