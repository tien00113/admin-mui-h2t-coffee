import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { AppDispatch, RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getStatsLastDayAction } from '../../Redux/Admin/admin.action';
import DatePickerOne from '../Forms/DatePicker/DatePickerOne';
import DatePickerTwo from '../Forms/DatePicker/DatePickerTwo';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Roboto, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100000,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const stats = useSelector((state: RootState) => state.admin.stats);
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Doanh Số',
        data: stats?.revenue || [],
      },

      {
        name: 'Đơn Hàng',
        data: stats?.orders || [],
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  const [days, setDays] = useState<Number>(7);
  const [dates, setDates] = useState<string[]>();
  const [option, setOption] = useState(options);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getStatsLastDayAction(days));
    }
    if (stats) {
      setDates(stats.dates);
    }
  }, [dispatch, days]);

  useEffect(() => {
    if (stats) {
      const formattedDates = stats.dates.map((date: string) => {
        const d = new Date(date);
        return `${("0" + d.getDate()).slice(-2)}/${("0" + (d.getMonth() + 1)).slice(-2)}`;
      });

      setDates(formattedDates);
      setState({
        series: [
          {
            name: 'Doanh Số',
            data: stats?.revenue || [],
          },
          {
            name: 'Đơn Hàng',
            data: stats?.orders || [],
          },
        ],
      });
    }
  }, [stats]);

  useEffect(() => {
    if (dates) {
      const updatedOptions = {
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: dates,
        },
      };
      setOption(updatedOptions);
    }
  }, [dates]);


  let minDate, maxDate;

  if (dates) {
    const dateObjects = stats.dates.map((date: string) => new Date(date));

    // Sắp xếp mảng dateObjects
    dateObjects.sort((a: { getTime: () => number; }, b: { getTime: () => number; }) => a.getTime() - b.getTime());

    // Ngày nhỏ nhất là phần tử đầu tiên, ngày lớn nhất là phần tử cuối cùng
    minDate = dateObjects[0];
    maxDate = dateObjects[dateObjects.length - 1];
  }


  // Định dạng ngày theo định dạng dd.mm.yyyy
  const formatDate = (date: Date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  console.log(stats);
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Tổng doanh số</p>
              {/* <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p> */}
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Tổng đơn hàng</p>
              {/* <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p> */}
            </div>
          </div>
          <div className='flex'>
            <p className="text-sm font-medium justify-center items-center">
              <span className='font-medium'>Thời gian:</span> {minDate && maxDate ? `${formatDate(minDate)} - ${formatDate(maxDate)}` : ''}
            </p>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button onClick={() => setDays(7)} className={`rounded py-1 px-3 text-xs font-medium text-black ${days === 7 ? 'shadow-card' : ''} hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark`}>
              Tuần
            </button>
            <button onClick={() => setDays(30)} className={`rounded py-1 px-3 ${days === 30 ? 'shadow-card' : ''} text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark`}>
              Tháng
            </button>
          </div>
        </div>
      </div>

      {/* <div>
        <DatePickerOne/>
      </div> */}

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={option}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
