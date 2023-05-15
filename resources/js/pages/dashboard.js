import { AdjustOverview } from '../components/dashboard/AdjustOverview.js';
import { ScheduleChart } from '../components/dashboard/schedule-chart.js';
export class DashBoard {
    static index() {
        var adjust = new AdjustOverview();
        adjust.run();
        var schedule = new ScheduleChart();
        schedule.run();
        //time header
        customFuncs.appendTextNowTime('.classroom__header__description');
    }
}
