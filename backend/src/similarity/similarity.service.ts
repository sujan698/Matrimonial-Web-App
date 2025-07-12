import { Injectable } from '@nestjs/common';

@Injectable()
export class SimilarityService {
  private readonly enumMappings = {
    Gender: { Male: 1, Female: 2, NonBinary: 3 },
    Religion: { hinduism: 1, buddhism: 2, islam: 3, christianity: 4, others: 5 },
    MaritalStatus: { single: 1, widowed: 2, divorced: 3 },
    DietPreference: { Veg: 1, NonVeg: 2, Eggiterian: 3, Vegan: 4, NoPreference: 5 },
    EducationLevel: {
      PrimaryLevel: 1,
      SecondaryLevel: 2,
      HigherSecondaryLevel: 3,
      Bachelor: 4,
      Masters: 5,
      PhD: 6,
      Diploma: 7,
    },
    EmploymentStatus: {
      Employed: 1,
      SelfEmployed: 2,
      Student: 3,
      Unemployed: 4,
      Retired: 5,
    },
    FamilyType: { Joint: 1, Nuclear: 2, Extended: 3 },
    ResidentialStatus: { NepaliCitizen: 1, PRHolder: 2, NRN: 3 },
    FamilyClass: { MiddleClass: 1, UpperClass: 2, LowerClass: 3 },
    Ethnicity: {
      Brahmin: 1,
      Chhetri: 2,
      Newar: 3,
      Gurung: 4,
      Magar: 5,
      Rai: 6,
      Limbu: 7,
      Tamang: 8,
      Sherpa: 9,
      Thakuri: 10,
      Dalit: 11,
      Madhesi: 12,
      Janajati: 13,
      Others: 14,
    },
    FamilyValue: { Traditional: 1, Modern: 2, Liberal: 3 },
    MotherTongue: {
      Nepali: 1,
      Newari: 2,
      Maithili: 3,
      Bhojpuri: 4,
      Tharu: 5,
      Tamang: 6,
      Sherpa: 7,
      Gurung: 8,
      Magar: 9,
      Rai: 10,
      Limbu: 11,
      Others: 12,
    },
  };

  private mapEnumToNumber(value: string | null, mapping: Record<string, number>): number {
    return value ? mapping[value] || 0 : 0;
  }

  private createVector(profile: any): number[] {
    return [
      this.mapEnumToNumber(profile.gender, this.enumMappings.Gender),
      this.mapEnumToNumber(profile.religion, this.enumMappings.Religion),
      this.mapEnumToNumber(profile.maritalStatus, this.enumMappings.MaritalStatus),
      profile.ageRange || 0,
      this.mapEnumToNumber(profile.dietPreference, this.enumMappings.DietPreference),
      this.mapEnumToNumber(profile.educationLevel, this.enumMappings.EducationLevel),
      this.mapEnumToNumber(profile.employmentStatus, this.enumMappings.EmploymentStatus),
      this.mapEnumToNumber(profile.familyType, this.enumMappings.FamilyType),
      this.mapEnumToNumber(profile.residentialStatus, this.enumMappings.ResidentialStatus),
      profile.incomeRange || 0,
      this.mapEnumToNumber(profile.ethnicity, this.enumMappings.Ethnicity),
      this.mapEnumToNumber(profile.familyValue, this.enumMappings.FamilyValue),
      this.mapEnumToNumber(profile.motherTongue, this.enumMappings.MotherTongue),
    ];
  }

  private cosineSimilarity(vectorA: number[], vectorB: number[]): number {
    const dotProduct = vectorA.reduce((sum, value, index) => sum + value * vectorB[index], 0);
    const magnitudeA = Math.sqrt(vectorA.reduce((sum, value) => sum + value * value, 0));
    const magnitudeB = Math.sqrt(vectorB.reduce((sum, value) => sum + value * value, 0));

    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
  }

  public calculateMatchScore(profile: any, partnerPreference: any): number {
    const profileVector = this.createVector(profile);
    const preferenceVector = this.createVector(partnerPreference);

    return this.cosineSimilarity(profileVector, preferenceVector);
  }
}