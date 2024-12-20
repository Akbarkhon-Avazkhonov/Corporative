import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from './admin.guad';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiOperation({
    description: 'Get referral links count (just number)',
  })
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get('/referral/count')
  getReferralCount() {
    return this.adminService.getReferralCount();
  }

  @ApiOperation({
    description: 'Get all balance (just number)',
  })
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get('/balance')
  getBalance() {
    return this.adminService.getBalance();
  }

  @ApiOperation({
    description: 'Get top 10 users with the highest balance',
  })
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get('/top-referrals')
  getTopReferrals() {
    return this.adminService.getTopReferrals();
  }

  @ApiOperation({
    description: 'Get all users with pagination',
  })
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  // get all users with pagination
  @Get('/users/:page')
  getUsers(@Param('page') page: number) {
    return this.adminService.getUsers(page);
  }

  @ApiOperation({
    description: 'Get all products with pagination',
  })
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  // get product with pagination
  @Get('/products/:page')
  getProducts(@Param('page') page: number) {
    return this.adminService.getProducts(page);
  }
  // get new users by date

  @ApiOperation({
    description: 'Get new users by date',
  })
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get('/new-users')
  getNewUsers() {
    return this.adminService.getNewUsers();
  }

  @ApiOperation({
    description: 'Get e-coin rate',
  })
  @Get('/rate')
  getEcoinRate() {
    return this.adminService.getRate();
  }

  @ApiOperation({
    description: 'Change e-coin rate',
  })
  @ApiBody({
    description: 'Change e-coin rate',
    schema: {
      type: 'object',
      properties: {
        rate: { type: 'number' },
      },
    },
  })
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Post('/rate')
  changeEcoinRate(@Body() body) {
    return this.adminService.changeRate(body.rate);
  }

  @ApiTags('Referral Lincks')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Get('/user-profile/:id')
  getUserProfile(@Param('id') id: number) {
    return this.adminService.getUserProfile(+id);
  }
}
