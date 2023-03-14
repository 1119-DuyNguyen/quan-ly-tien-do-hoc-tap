import { AdjustOverview } from '../components/dashboard/AdjustOverview.js';
import { ScheduleChart } from '../components/dashboard/schedule-chart.js';
export class DashBoard {
    static index() {
        // import ''
        var adjust = new AdjustOverview();
        adjust.run();
        var schedule = new ScheduleChart();
        schedule.run();
    }
}
