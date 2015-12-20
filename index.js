$(document).ready(function() {
	//button click
	$("#btn").click(function(){
		
        var inpNum = new Array(), sum = 0, circleslice = 0, chkH = 0;
		
        //chart canvas elements
		var mycanvas1 = document.getElementById('chartDia');
		var context1 = mycanvas1.getContext('2d');
        context1.font = "14px Arial";
        context1.clearRect(0, 0, mycanvas1.width, mycanvas1.height);
		
        //circle canvas element
        var mycanvas2 = document.getElementById('circleDia');
		var context2 = mycanvas2.getContext('2d');
        context2.font = "14px Arial";
        context2.clearRect(0, 0, mycanvas2.width, mycanvas2.height);
		
        //scan data
		for (var i = 0; i < document.forms[0].length - 1; i++) {
			inpNum[i] = new inputObject(document.forms[0].elements[i].value,
                                        getRandomColor(), 
                                        chartDiagramWidth(),
                                        startChartPos(i,chartDiagramWidth())
                                       );
            //sum counting
            sum += parseFloat(document.forms[0].elements[i].value, 10);
            //chk height
            if (chartDiagramHeightChk(document.forms[0].elements[i].value) > chkH) {
                chkH = chartDiagramHeightChk(document.forms[0].elements[i].value);
            }
		}
        
        //counting for diagrams
        for (var i = 0; i < document.forms[0].length - 1; i++) {
            //chart D height
            inpNum[i].chartHeight = chartDiagramHeight(inpNum[i].inValue, chkH);
            
            //circle D start & end pos
            inpNum[i].startCirclePosition = circleslice;
            circleslice += countCirclePos(inpNum[i].inValue, sum);
            inpNum[i].endCirclePosition = circleslice;
        }
        
        //chart diagram drawing
        for (var i = 0; i < document.forms[0].length - 1; i++){
            context1.fillStyle = inpNum[i].color;
            context1.fillRect(inpNum[i].startChartPosition, inpNum[i].chartHeight, inpNum[i].chartWidth, 300);
            context1.fillText(inpNum[i].inValue, inpNum[i].startChartPosition, inpNum[i].chartHeight -2);
        }
        
        //circle diagram drawing
		for(var i = 0; i < document.forms[0].length - 1; i++) {
            context2.fillStyle = inpNum[i].color;
            context2.beginPath();
            context2.moveTo(150, 150);
            context2.arc(150, 150, 100, inpNum[i].startCirclePosition, inpNum[i].endCirclePosition, false);
            context2.lineTo(150, 150);
            context2.fill();
            context2.fillRect(inpNum[i].startChartPosition - inpNum[i].chartWidth, 270, inpNum[i].chartWidth, 290);
            context2.fillText(inpNum[i].inValue, inpNum[i].startChartPosition, 290);
        }
    });

    //object
    function inputObject(value, color, chWidth, chStartPosW){
        this.inValue = value;
        this.color = color;
        this.startChartPosition = chStartPosW;
        this.chartHeight = 0;
        this.chartWidth = chWidth;
        this.startCirclePosition = 0;
        this.endCirclePosition = 0;
    }

    //color generator
    function getRandomColor(){
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //colum width counting
    function chartDiagramWidth(){
        return Math.floor(300/((2*document.forms[0].length) - 1)); 
    }
    
    //colum height chk
    function chartDiagramHeightChk(height){
        return height / 280;
    }

    //colum height counting
    function chartDiagramHeight(height, oszt){
        return 300 - (height / oszt);
    }

    //starting chart position
    function startChartPos(index, wdistance){
        return (index + index +1) * wdistance;        
    }
    
    //counting circle position
    function countCirclePos (inputValue, summ) {
        return ((2 * Math.PI) /summ) * inputValue;
    }
});