import { AdjustOverview } from '../components/dashboard/AdjustOverview.js';
import { ScheduleChart } from '../components/dashboard/schedule-chart.js';
import { ClassCenter } from '../components/dashboard/classCenter.js';
import { RightPanelDashboard } from '../components/dashboard/rightPanelDashboard.js';
export class DashBoard {
    static index() {
        var adjust = new AdjustOverview();
        adjust.run();
        var schedule = new ScheduleChart();
        schedule.run();
        var classCenter = new ClassCenter();
        classCenter.run();
        var rightPanelDashboard = new RightPanelDashboard();
        rightPanelDashboard.run();
        //time header
        customFuncs.appendTextNowTime('.classroom__header__description');
    }
}
