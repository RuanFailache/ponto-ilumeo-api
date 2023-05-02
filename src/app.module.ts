import { Module } from '@nestjs/common';

import { AuthenticationModule, CardsModule } from '@infrastructure/modules';

@Module({
    imports: [AuthenticationModule, CardsModule],
})
export class AppModule {}
