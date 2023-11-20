import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Chart from 'chart.js/auto';

interface IChart {
  name: string;
  labels: string[];
  data: number[];
  backgroundColor: string[];
}

@Component({
  selector: 'app-semester-overview',
  templateUrl: './semester-overview.component.html',
  styleUrls: ['./semester-overview.component.scss']
})
export class SemesterOverviewComponent implements OnInit {
  public chart: any;

  citizenShipChart: IChart = {
    name: 'citizenShipChart',
    labels: ['Armenia', 'Russia', 'Egypt'],
    data: [10, 65, 10],
    backgroundColor: ['#002d6e', '#8eb2ec', 'rgba(0, 80, 207, 0.1)']
  };

  genderChart: IChart = {
    name: 'genderChart',
    labels: ['Mаle', 'Female'],
    data: [55, 65],
    backgroundColor: ['#002d6e', 'rgba(0, 80, 207, 0.1)']
  };

  facultyChart: IChart = {
    name: 'facultyChart',
    labels: ['FBB', 'FCMD'],
    data: [55, 25],
    backgroundColor: ['#002d6e', 'rgba(0, 80, 207, 0.1)']
  };

  facultyPercentChart: IChart = {
    name: 'facultyPercentChart',
    labels: ['Yes', 'No'],
    data: [55, 25],
    backgroundColor: ['#002d6e', 'rgba(0, 80, 207, 0.1)']
  };

  timeChart: IChart = {
    name: 'timeChart',
    labels: ['Yes', 'No'],
    data: [55, 25],
    backgroundColor: ['#002d6e', 'rgba(0, 80, 207, 0.1)']
  };

  percentChart: IChart = {
    name: 'percentChart',
    labels: ['Yes', 'No'],
    data: [55, 25],
    backgroundColor: ['#002d6e', 'rgba(0, 80, 207, 0.1)']
  };

  effectiveChart: IChart = {
    name: 'effectiveChart',
    labels: ['Yes', 'No'],
    data: [55, 25],
    backgroundColor: ['#002d6e', 'rgba(0, 80, 207, 0.1)']
  };


  downloadPDF(): void {
    const DATA: any = document.getElementById('userChart');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURL = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 20;
      PDF.addImage(FILEURL, 'PNG', 20, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }


  ngOnInit(): void {
    this.createCitizenShipChart(this.citizenShipChart);
    this.createCitizenShipChart(this.genderChart);
    this.createCitizenShipChart(this.facultyChart);
    this.createCitizenShipChart(this.facultyPercentChart);
    this.createCitizenShipChart(this.timeChart);
    this.createCitizenShipChart(this.percentChart);
    this.createCitizenShipChart(this.effectiveChart);

  }












  createCitizenShipChart(array: IChart) {

    this.chart = new Chart(array.name, {
      type: 'doughnut',

      data: {
        labels: array.labels,
        datasets: [{
          data: array.data,
          backgroundColor: array.backgroundColor,
          hoverOffset: 2
        }],
      },
      options: {
        aspectRatio: 1.2
      }

    });

  }
}
