$(function () {
    var diagram = {
        //variables
        inpNum: [],
        sum: 0,
        circleslice: 0,
        chkH: 0,
        chkW1: 0,
        chkW2: 0,
        myCanvas1: null,
        c1Context: null,
        myCanvas2: null,
        c2Context: null,
        myForm: null,
        //object
        inputObject: function (color, chHeight, chStartPoz, startCirclePoz, endCirclePoz) {
            this.color = color;
            this.chartHeight = chHeight;
            this.startChartPosition = chStartPoz;
            this.startCirclePosition = startCirclePoz;
            this.endCirclePosition = endCirclePoz;
        },
        //init (main)
        init: function (canvas1ID, canvas2ID, formID) {
            this.cacheDOM(canvas1ID, canvas2ID, formID);
            this.chartDiaDataCounting();
            this.setBasicDataInObject();
            this.renderChartDiagram();
            this.renderCircleDiagram();
            this.sum = 0;
            this.circleslice = 0;
        },
        //cacheDOM
        cacheDOM: function (canvas1ID, canvas2ID, formID) {
            this.myCanvas1 = document.getElementById(canvas1ID);
            this.c1Context = this.myCanvas1.getContext('2d');
            this.c1Context.font = "14px Arial";
            this.c1Context.clearRect(0, 0, this.myCanvas1.width, this.myCanvas1.height);
            this.myCanvas2 = document.getElementById(canvas2ID);
            this.c2Context = this.myCanvas2.getContext('2d');
            this.c2Context.font = "14px Arial";
            this.c2Context.clearRect(0, 0, this.myCanvas2.width, this.myCanvas2.height);
            this.myForm = document.getElementById(formID);
        },
        //height dividend, sum width counting for chart diagram
        chartDiaDataCounting: function () {
            this.chkW1 = Math.floor(this.myCanvas1.width / ((2 * this.myForm.length) - 1));
            this.chkW2 = Math.floor(this.myCanvas2.width / ((2 * this.myForm.length) - 1));
            for (var i = 0; i < this.myForm.length - 1; i++) {
                this.sum += parseFloat(this.myForm.elements[i].value);
                if (this.myForm.elements[i].value / (this.myCanvas1.height - 20) > this.chkH)
                    this.chkH = this.myForm.elements[i].value / (this.myCanvas1.height - 20);
            }
        },
        //set data in object
        setBasicDataInObject: function () {
            for (var i = 0; i < this.myForm.length - 1; i++) {
                this.inpNum[i] = new this.inputObject(this.getRandomColor(),
                                                      this.chartDiagramHeight(this.myForm.elements[i].value),
                                                      this.startChartPos(i),
                                                      this.circleslice,
                                                      this.circleslice + this.countCirleSlice(this.myForm.elements[i].value)
                                                     );
                this.circleslice += this.countCirleSlice(this.myForm.elements[i].value);
            }
        },
        //random color
        getRandomColor: function () {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        //chart diagram height counting
        chartDiagramHeight: function (inputValue) {
            return (this.myCanvas1.height - (inputValue / this.chkH));
        },
        //start position for chart colum
        startChartPos: function (index) {
            return ((index + index + 1) * this.chkW1);
        },
        //start positon for circle tooltips
        startCircleTxtPos: function (index) {
            return ((index + index + 1) * this.chkW2);
        },
        //circle diagram slice counting
        countCirleSlice: function (inputValue) {
            return ((2 * Math.PI) / this.sum) * inputValue;
        },
        //drawing chart diagram
        renderChartDiagram: function () {
            for (var i = 0; i < this.myForm.length - 1; i++) {
                this.c1Context.fillStyle = this.inpNum[i].color;
                this.c1Context.fillRect(this.inpNum[i].startChartPosition, this.inpNum[i].chartHeight, this.chkW1, this.myCanvas1.height);
                this.c1Context.fillText(this.myForm.elements[i].value, this.inpNum[i].startChartPosition, this.inpNum[i].chartHeight -2);
            }
        },
        //drawing circle diagram
        renderCircleDiagram: function () {
            for(var i = 0; i < this.myForm.length - 1; i++) {
                this.c2Context.fillStyle = this.inpNum[i].color;
                this.c2Context.beginPath();
                this.c2Context.moveTo(this.myCanvas2.width / 2, this.myCanvas2.height / 2);
                this.c2Context.arc(this.myCanvas2.width / 2,
                                   this.myCanvas2.height / 2,
                                   this.myCanvas2.height / 3,
                                   this.inpNum[i].startCirclePosition,
                                   this.inpNum[i].endCirclePosition,
                                   false
                                  );
                this.c2Context.lineTo(this.myCanvas2.width / 2, this.myCanvas2.height / 2);
                this.c2Context.fill();
                this.c2Context.fillRect(this.startCircleTxtPos(i) - this.chkW2, this.myCanvas2.height - 30, this.chkW2, this.myCanvas2.height - 10);
                this.c2Context.fillText(this.myForm.elements[i].value, this.startCircleTxtPos(i) + 2, this.myCanvas2.height - 10);
            }
        }
    };
    $("#btn").click(function () {
        diagram.init("chartDia", "circleDia", "fData");
    });
});