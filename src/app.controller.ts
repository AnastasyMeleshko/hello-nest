import {Controller, Get} from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    homePage() {
        return `Hi from films data base`
    }
}
