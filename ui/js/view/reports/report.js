define([
// These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'text!../../../templates/report/report.html',
  'xchart',
  'mdtp'


], function ($, _, Backbone, viewHtml, xChart) {
    var ReportView = Backbone.View.extend({

        el: $("#container"),

        events: {
            'click #viewreport': 'viewreport',
            'click #navback': 'back'
        },

        initialize: function () {
            $("#navback").html('<span class=" icon-arrow-left-3" ></span>');
           
            this.$el.html(viewHtml);

            this.populateYearSelect();
            this.populateMonthSelect();
            this.viewreport();

        },

        render: function () {

        },

        viewreport: function () {
            var view = this;
            console.log('cc');
            $.ajax({
                type: "GET", url: 'log/' + $('#year-select').val() + ',' + $('#month-select').val(), success: function (result) {


                    var data = {
                        "xScale": "ordinal",
                        "yScale": "linear",
                        "type": "bar",
                        "main": [
                                    {
                                        "className": ".pizza",
                                        "data": result
                                    }
                                  ]
                    }

                    console.log(result);

                    $("#chart-container").html("<figure style='width: 700px; height: 300px;' id='myChart'></figure>")
                    //var ctx = $("#myChart").get(0).getContext("2d");
                    var myChart = new xChart('bar', data, '#myChart');

                }, dataType: 'json'
            });
        },

        populateYearSelect: function () {

            var val = 0, base = 2000, currYear = new Date().getFullYear();
            for (var i = 0; i < 100; ++i) {
                val = (base + i);
                //console.log();

                if (val == currYear) {
                    $('#year-select').append('<option value=' + val + ' selected=selected>' + val + '</option>');
                    //console.log(val);
                } else {
                    $('#year-select').append('<option value=' + val + '>' + val + '</option>');
                }


            }
        },

        populateMonthSelect: function () {

            var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var currMonth = new Date().getMonth();
            for (var i = 0; i < 12; ++i) {
                if (i == currMonth) {
                    $('#month-select').append('<option value=' + (i + 1) + ' selected=selected>' + monthArr[i] + '</option>');
                } else {
                    $('#month-select').append('<option value=' + (i + 1) + '>' + monthArr[i] + '</option>');
                }
            }

        },

        back: function () {
            this.close();
            this.goto('', { trigger: true });
            return false;
        }

    });

    return ReportView;
    // What we return here will be used by other modules
});