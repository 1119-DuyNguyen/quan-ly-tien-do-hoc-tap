<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="">
    <title>Document</title>
    <link href="{{ asset('css/vendor/fontawesome6/css/fontawesome.min.css') }}" rel="stylesheet" />
    <!-- our project just needs Font Awesome Solid + Brands -->
    <link href="{{ asset('css/vendor/fontawesome6/css/fontawesome.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/vendor/fontawesome6/css/brands.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/vendor/fontawesome6/css/solid.css') }}" rel="stylesheet" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="keywords" content="qltdht, quản lí tiến độ học tập">
    @vite([
    "resources/scss/style.scss",
    "resources/js/app.js",
    ])
</head>

<body>
    <!--Start side bar panel-->
    <aside class="main-sidebar" id="main-sidebar">
        {{-- <div class="container">
            <ul class="sidebar__nav">
                <li>
                    <div class="sidebar__nav__static">
                        <div class="sidebar__nav__img rectangle_image">
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
                    <a href="{{ url('/') }}" class="sidebar__nav__link">
                        <i class="fa-solid fa-house icon"></i>
                        <span class="sidebar__nav__text"> Trang chủ </span>
                    </a>
                </li>
                <li>
                    <a href="{{ url('/info') }}" class="sidebar__nav__link">
                        <i class="fa-regular fa-user icon"></i>
                        <span class="sidebar__nav__text">Thông tin cá nhân</span>
                    </a>
                </li>

                <li>
                    <a href="{{ url('/quan-ly-tot-nghiep') }}" class="sidebar__nav__link">
                        <i class="fa-solid fa-chart-simple icon"></i>
                        <span class="sidebar__nav__text">Quản lý tiến trình tốt nghiệp</span>
                    </a>
                </li>
                <li>
                    <a href="{{ url('/class') }}" class="sidebar__nav__link">
                        <i class="fa-solid fa-chalkboard icon"></i>
                        <span class="sidebar__nav__text"> Lớp học</span>
                    </a>
                </li>
                <li>
                    <a href="{{ url('/logout') }}" class="sidebar__nav__link">
                        <i class="fa-solid fa-arrow-right-from-bracket icon"></i>
                        <span class="sidebar__nav__text">Đăng xuất</span>
                    </a>
                </li>
            </ul>
        </div> --}}
    </aside>
    <!--End side bar panel-->
    <div id="main-content">

    </div>

    {{-- <script src="./js/header.js"></script>
    <script src="./js/components/schedule-chart.js"></script>
    <script src="./js/adjustProcessLayout.js"></script>
    <script src="./js/setTimeCalendar.js"></script>
    <script src="./js/setColorClassItem.js"></script> --}}

</body>

</html>