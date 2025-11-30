import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto, UpdatePlayerDto, CreatePlayerProfileDto } from './dto/player.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('players')
@UseGuards(AuthGuard('jwt'))
export class PlayersController {
    constructor(private readonly playersService: PlayersService) { }

    @Post()
    create(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playersService.create(createPlayerDto);
    }

    @Get()
    findAll(@Query('teamId') teamId?: string) {
        return this.playersService.findAll(teamId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.playersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
        return this.playersService.update(id, updatePlayerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.playersService.remove(id);
    }

    @Post(':id/profile')
    createProfile(
        @Param('id') id: string,
        @Body() createProfileDto: CreatePlayerProfileDto,
    ) {
        return this.playersService.createProfile(id, createProfileDto);
    }

    @Patch(':id/profile')
    updateProfile(
        @Param('id') id: string,
        @Body() updateProfileDto: CreatePlayerProfileDto,
    ) {
        return this.playersService.updateProfile(id, updateProfileDto);
    }
}
