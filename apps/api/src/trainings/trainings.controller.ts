import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto, UpdateTrainingDto, CreateAttendanceDto, CreateRpeDto } from './dto/training.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('trainings')
@UseGuards(AuthGuard('jwt'))
export class TrainingsController {
    constructor(private readonly trainingsService: TrainingsService) { }

    @Post()
    create(@Body() createTrainingDto: CreateTrainingDto) {
        return this.trainingsService.create(createTrainingDto);
    }

    @Get()
    findAll(
        @Query('teamId') teamId?: string,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.trainingsService.findAll(teamId, startDate, endDate);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.trainingsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
        return this.trainingsService.update(id, updateTrainingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.trainingsService.remove(id);
    }

    @Post('attendance')
    recordAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
        return this.trainingsService.recordAttendance(createAttendanceDto);
    }

    @Get(':id/attendance')
    getAttendance(@Param('id') id: string) {
        return this.trainingsService.getAttendance(id);
    }

    @Post('rpe')
    recordRpe(@Body() createRpeDto: CreateRpeDto) {
        return this.trainingsService.recordRpe(createRpeDto);
    }

    @Get(':id/rpe')
    getRpe(@Param('id') id: string) {
        return this.trainingsService.getRpe(id);
    }

    @Get('player/:playerId/stats')
    getPlayerStats(@Param('playerId') playerId: string) {
        return this.trainingsService.getPlayerStats(playerId);
    }
}
