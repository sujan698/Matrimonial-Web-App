import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

// import { ProfilesModule } from './profiles/profiles.module';

import { MessagesModule } from './messages/messages.module';
import { MatchesModule } from './matches/matches.module';
import { InterestsModule } from './interests/interests.module';
import { ReportsModule } from './reports/reports.module';
import { LikesModule } from './likes/likes.module';
import { FamilydetailsModule } from './familydetails/familydetails.module';
import { AuthModule } from './authentication/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UploadPhotosModule } from './upload-photos/upload-photos.module';
import { PartnerPreferencesModule } from './partner-preferences/partner-preferences.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { DemographicDetailsModule } from './demographic-details/demographic-details.module';
import { ProvincesModule } from './provinces/provinces.module';
import { DistrictsModule } from './districts/districts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MatchingModule } from './matching/matching.module';
import { BlocksModule } from './blocks/blocks.module';
import { ChatModule } from './chat/chat.module';





@Module({
  imports: [
    CloudinaryModule,
    RolesModule,
    UsersModule,
    AuthModule,
   DemographicDetailsModule,

   ProvincesModule,
   DistrictsModule,
    MessagesModule,
    MatchesModule,
    InterestsModule,
    ReportsModule,
    LikesModule,
    FamilydetailsModule,
    ConfigModule.forRoot(),
    UploadPhotosModule,
    PartnerPreferencesModule,
    DemographicDetailsModule,
    ProvincesModule,
    DistrictsModule,
    NotificationsModule,
    MatchingModule,
    BlocksModule,
    ChatModule,
   
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
