import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from './auth.guad';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @ApiBody({
    description: 'Login with admin name and password',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('/login')
  login(@Body() body) {
    return this.adminService.login(body.name, body.password);
  }
  @ApiOkResponse({
    description: 'Get referral links count (just number)',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/referral/count')
  getReferralCount() {
    return this.adminService.getReferralCount();
  }

  @ApiOkResponse({
    description: 'Get all balance (just number)',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/balance')
  getBalance() {
    return this.adminService.getBalance();
  }

  @ApiOkResponse({
    description: 'Get top 10 users with the highest balance',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/top-referrals')
  getTopReferrals() {
    return this.adminService.getTopReferrals();
  }

  @ApiOkResponse({
    description: 'Get all users with pagination',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  // get all users with pagination
  @Get('/users/:page')
  getUsers(@Param('page') page: number) {
    return this.adminService.getUsers(page);
  }

  @ApiOkResponse({
    description: 'Get all products with pagination',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  // get product with pagination
  @Get('/products/:page')
  getProducts(@Param('page') page: number) {
    return this.adminService.getProducts(page);
  }
  // get new users by date

  @ApiOkResponse({
    description: 'Get new users by date',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/new-users')
  getNewUsers() {
    return this.adminService.getNewUsers();
  }
}
