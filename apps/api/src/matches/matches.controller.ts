import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto, UpdateMatchDto, CreateLineupDto, CreateEventDto, UpdateStatsDto } from './dto/match.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('matches')
@UseGuards(AuthGuard('jwt'))
export class MatchesController {
    constructor(private readonly matchesService: MatchesService) { }

    @Post()
    create(@Body() createMatchDto: CreateMatchDto) {
        return this.matchesService.create(createMatchDto);
    }

    @Get()
    findAll(
        @Query('teamId') teamId?: string,
        @Query('seasonId') seasonId?: string,
    ) {
        return this.matchesService.findAll(teamId, seasonId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.matchesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
        return this.matchesService.update(id, updateMatchDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.matchesService.remove(id);
    }

    @Post('lineup')
    addLineup(@Body() createLineupDto: CreateLineupDto) {
        return this.matchesService.addLineup(createLineupDto);
    }

    @Get(':id/lineup')
    getLineup(@Param('id') id: string) {
        return this.matchesService.getLineup(id);
    }

    @Post('events')
    addEvent(@Body() createEventDto: CreateEventDto) {
        return this.matchesService.addEvent(createEventDto);
    }

    @Get(':id/events')
    getEvents(@Param('id') id: string) {
        return this.matchesService.getEvents(id);
    }

    @Patch(':matchId/stats/:playerId')
    updateStats(
        @Param('matchId') matchId: string,
        @Param('playerId') playerId: string,
        @Body() updateStatsDto: UpdateStatsDto,
    ) {
        return this.matchesService.updateStats(matchId, playerId, updateStatsDto);
    }

    @Get(':id/stats')
    getStats(@Param('id') id: string) {
        return this.matchesService.getStats(id);
    }

    @Get('player/:playerId/history')
    getPlayerMatchHistory(@Param('playerId') playerId: string) {
        return this.matchesService.getPlayerMatchHistory(playerId);
    }
}
