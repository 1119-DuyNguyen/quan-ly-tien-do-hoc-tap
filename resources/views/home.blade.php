<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./css/vendor/fontawesome6/css/fontawesome.min.css" />
    <!-- our project just needs Font Awesome Solid + Brands -->
    <link href="./css/vendor/fontawesome6/css/fontawesome.css" rel="stylesheet" />
    <link href="./css/vendor/fontawesome6/css/brands.css" rel="stylesheet" />
    <link href="./css/vendor/fontawesome6/css/solid.css" rel="stylesheet" />


    @vite([
    "resources/scss/style.scss",
    "resources/js/app.js",])
</head>

<body>
    <!--Start side bar panel-->
    <aside class="main-sidebar" id="main-sidebar">
        <div class="container">
            <ul class="sidebar__nav">
                <li>
                    <div class="sidebar__nav__static">
                        <div class="sidebar__nav__img circular_image">
                            <img src="./img/icon.png" alt="" />
                        </div>
                        <div class="sidebar__nav__title">
                            <h3 class="sidebar__nav__title__header">
                                Nguyễn Thanh Duy Nguyễn Thanh Duy Nguyễn
                                Thanh Duy
                            </h3>

                            <span class="sidebar__nav__title__description">
                                <i class="fa-solid fa-graduation-cap icon"></i>Sinh viên</span>
                        </div>
                    </div>
                </li>
                <!-- <li>
                        <div class="sidebar__nav__static">
                            <div class="sidebar__nav__title">
                                <h3 class="sidebar__nav__title__header">
                                    Nguyễn Thanh Duy
                                </h3>

                                <span class="sidebar__nav__title__description">
                                    <i
                                        class="fa-solid fa-graduation-cap icon"
                                    ></i
                                    >Sinh viên</span
                                >
                            </div>
                        </div>
                    </li> -->
                <li>
                    <!-- <div class="sidebar__nav__static">
                            <div class="sidebar__nav__img user-login">
                                <div class="user-login__info">
                                    <h3 class="user-login__info__title">
                                        Nguyễn Thanh Duy đẹp trai hightlight
                                    </h3>
                                    <div class="user-login__info__description">
                                        <i
                                            class="fa-solid fa-graduation-cap icon"
                                        ></i>
                                        <span>Sinh viên</span>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                </li>
                <!-- <li>
                        <div
                            class="user-search-bar input-icons sidebar__nav__link"
                        >
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài tập"
                                class="input-field sidebar__nav__text"
                            />
                        </div>
                    </li> -->
                <li>
                    <a href="#" class="sidebar__nav__link" onclick="return false;">
                        <i class="fa-solid fa-house icon"></i>
                        <span class="sidebar__nav__text"> Trang chủ </span>
                    </a>
                </li>
                <li>
                    <a href="#" class="sidebar__nav__link" onclick="return false;">
                        <i class="fa-regular fa-user icon"></i>
                        <span class="sidebar__nav__text">Thông tin cá nhân</span>
                    </a>
                </li>

                <li>
                    <a href="#" class="sidebar__nav__link" onclick="return false;">
                        <i class="fa-solid fa-chart-simple icon"></i>
                        <span class="sidebar__nav__text">Quản lý tiến trình tốt nghiệp</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="sidebar__nav__link" onclick="return false;">
                        <i class="fa-solid fa-chalkboard icon"></i>
                        <span class="sidebar__nav__text"> Lớp học</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="sidebar__nav__link" onclick="return false;">
                        <i class="fa-solid fa-book icon"></i>
                        <span class="sidebar__nav__text">Bài tập</span>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
    <!--End side bar panel-->
    <div id="main-content">
        <div class="center-container">
            <!--start content classroom-->
            <div class="classroom">
                <div class="classroom__header">
                    <h1 class="classroom__header__title">
                        Xin chào Nguyễn Thanh Duy đẹp trai hightlight
                    </h1>
                    <div class="classroom__header__description">
                        Thứ 2, ngày 3 tháng 2 năm 2023
                    </div>
                </div>
            </div>
            <!--end content classroom-->

            <div class="class-item">
                <div class="class-item__text">
                    <h3>
                        Lập trình web và ứng dụng asfno vsdfja fdfk osjk
                    </h3>
                </div>
                <div class="class-item__bar">
                    <div class="class-item__bar--progress"></div>
                    <span>10 tasks | 56%</span>
                </div>
            </div>
            <div class="class-item">
                <div class="class-item__text">
                    <h3>
                        Lập trình web và ứng dụng á ca scjnoaavoeqưqf ă fc
                        ưè qds av qre eqr fava feq v req qve advqe fv aẻew
                        ẻgrv ưvẻ găgreg ưẻ gẻb rff wr frưe fwrf w gửg ư g
                    </h3>
                </div>
                <div class="class-item__bar">
                    <div class="class-item__bar--progress"></div>
                    <span>10 tasks | 56%</span>
                </div>
            </div>
            <div class="class-item">
                <div class="class-item__text">
                    <h3>Lập trình web và ứng dụng</h3>
                </div>
                <div class="class-item__bar">
                    <div class="class-item__bar--progress"></div>
                    <span>10 tasks | 56%</span>
                </div>
            </div>
            <div class="class-item">
                <div class="class-item__text">
                    <h3>Lập trình web và ứng dụng</h3>
                </div>
                <div class="class-item__bar">
                    <div class="class-item__bar--progress"></div>
                    <span>10 tasks | 56%</span>
                </div>
            </div>
            <div class="class-item">
                <div class="class-item__text">
                    <h3>Lập trình web và ứng dụng</h3>
                </div>
                <div class="class-item__bar">
                    <div class="class-item__bar--progress"></div>
                    <span>10 tasks | 56%</span>
                </div>
            </div>
            <div class="class-item">
                <div class="class-item__text">
                    <h3>Lập trình web và ứng dụng</h3>
                </div>
                <div class="class-item__bar">
                    <div class="class-item__bar--progress"></div>
                    <span>10 tasks | 56%</span>
                </div>
            </div>
            <div class="class-item">
                <div class="class-item__text">
                    <h3>
                        Phân tích thiết ké hệ thống thông tin nânvfdvl luôn
                        cho tên nó dài
                    </h3>
                </div>
                <div class="class-item__bar">
                    <div class="class-item__bar--progress"></div>
                    <span>10 tasks | 56%</span>
                </div>
            </div>
            <div class="class-item">
                <div class="class-item__text">
                    <h3>Lập trình web và ứng dừèwêfwềụng</h3>
                </div>
                <div class="class-item__bar">
                    <div class="class-item__bar--progress"></div>
                    <span>10 tasks | 56%</span>
                </div>
            </div>
            <div class="class-item">
                <div class="class-item__text">
                    <h3>Lập trình web và ứng dụng</h3>
                </div>
                <div class="class-item__bar">
                    <div class="class-item__bar--progress"></div>
                    <span>10 tasks | 56%</span>
                </div>
            </div>
            <div class="class-item">
                <div class="class-item__text">
                    <h3>Lập trình web và ứng dụng</h3>
                </div>
                <div class="class-item__bar">
                    <div class="class-item__bar--progress"></div>
                    <span>10 tasks | 56%</span>
                </div>
            </div>
            <div class="chart">
                <h1 class="chart__title">Kế hoạch thực hiện</h1>
                <h2 class="chart__header">
                    <button class="chart__header__prev">&leftarrow;</button>
                    <input type="date" class="chart__header__content" id="chart__header" />
                    <button class="chart__header__next">
                        &rightarrow;
                    </button>
                </h2>
                <div class="chart__content" id="chart__content"></div>
            </div>
        </div>
        <div class="right-container">
            <div class="progress-container">
                <h3 class="progress-container__heading">Tiến độ bài tập</h3>
                <div class="percentage">
                    <div class="percentage__circle">
                        <div class="percentage__text--daily">
                            Tiến độ hôm nay
                        </div>
                        <div class="percentage__circle--circle c100 pink center small">
                            <span class="percentage__circle--text"></span>
                            <div class="slice">
                                <div class="bar"></div>
                                <div class="fill"></div>
                            </div>
                        </div>
                        <div class="percentage__text--completed"></div>
                        <div class="percentage__text--task"></div>
                    </div>
                    <div class="percentage__taskHours">
                        <div class="percentage__taskHours--item percentage__tasks">
                            <span>13</span><img src="./img/check.png" alt="" />
                            <p>
                                Bài tập<br />
                                đã hoàn thành
                            </p>
                        </div>
                        <div class="percentage__taskHours--item percentage__hours">
                            <span>10</span><img src="./img/clock.png" alt="" />
                            <p>
                                Tiếng<br />
                                đã học
                            </p>
                        </div>
                    </div>
                </div>
                <div class="deadline">
                    <span>6 bài tập còn lại hôm nay</span>
                    <div class="deadline__link">
                        <a href="#">xem thêm</a><img src="./img/next.png" />
                    </div>
                    <div class="deadline__item">
                        <div class="deadline__item--subject">
                            LẬP TRÌNH WEB VÀ ỨNG DỤNG NÂNG CAO ĐỂ CỐ TÌNH
                            ĐẶT TÊN SIÊU DÀI
                        </div>
                        <div class="deadline__item--teacher">
                            Nguyễn Thanh Sang
                        </div>
                        <div class="deadline__item--time">1 ngày</div>
                        <div class="deadline__item--bio">
                            Thực hành HTML/CSS,db vg gd va av aegv aeo bfgb
                            JS, gửi và nộp ư ừẻbebfe ửvgvsf ửgsvd bài dưới
                            dạng pdf
                        </div>
                    </div>
                    <div class="deadline__item">
                        <div class="deadline__item--subject">
                            Nhập môn cờ vua
                        </div>
                        <div class="deadline__item--teacher">
                            Võ Khương Duy
                        </div>
                        <div class="deadline__item--time">12 tiếng</div>
                        <div class="deadline__item--bio">
                            Thực hiện thế cờ khai cuộc Queen's Gambit trên
                            Chess.com, chụp lại và nộp file pdf.
                        </div>
                    </div>
                </div>
                <div class="calendar">
                    <b>Thời khoá biểu</b>
                    <div class="calendar__time"></div>
                    <div class="calendar__item">
                        <div class="calendar__item--time">9: 50</div>
                        <div class="calendar__item--vertical-line"></div>
                        <div class="calendar__item--info">
                            Lập trình web và ứng dụng nhưng lại là một cái
                            gì đó dài thiệt dài để test layout
                        </div>
                    </div>
                    <div class="calendar__item">
                        <div class="calendar__item--time">11: 00</div>
                        <div class="calendar__item--vertical-line"></div>
                        <div class="calendar__item--info">Môn B</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- <script src="./js/header.js"></script>
    <script src="./js/components/schedule-chart.js"></script>
    <script src="./js/adjustProcessLayout.js"></script>
    <script src="./js/setTimeCalendar.js"></script>
    <script src="./js/setColorClassItem.js"></script> --}}
</body>

</html>