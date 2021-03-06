const sumArray = array => array.reduce((a,b) => a + b, 0)

d3.json("https://camiloibanez.github.io/Belly-Button-Biodiversity/StarterCode/samples.json").then(function(data) {
    data.names.forEach(function(id) {
        var dropdown = d3.select("#selDataset");
        dropdown.append("option").text(id);
    });

    function init() {
        
        var ids = data.samples[0].otu_ids;
        var values = data.samples[0].sample_values;
        var labels = data.samples[0].otu_labels;

        var otus = ids.map(function(value, index) {
            return {"id": value, "count": values[index], "name": labels[index]};
        });

        otus.sort((a,b) => b.count - a.count);

        var otuId = otus.map(OTU => OTU.id).slice(0,10).reverse();
        var otuValues = otus.map(OTU => OTU.count).slice(0,10).reverse();
        var otuLabels = otus.map(OTU => OTU.name).slice(0,10).reverse();

        var bacteriaSumF = [];
        var bacteriaSumM = [];
        var bacteriaSumNA = [];

        var wFreqF = [];
        var wFreqM = [];
        var wFreqNA = [];

        var white = ["caucasian", "caucasian/midleastern", "european", "caucasian/jewish", "white"];
        var asian = [ "caucasian/asian", "asian(south)", "pacificislander", "asian(american)"];

        var bacteriaSumW = [];
        var bacteriaSumB = [];
        var bacteriaSumA = [];
        var bacteriaSumH = [];

        var wFreqW = [];
        var wFreqB = [];
        var wFreqA = [];
        var wFreqH = [];

        var age = [];
        var bacteriaSumAge = [];
        var wFreqAge = [];

        for (var i = 0; i < data.names.length; i++) {

            var gender = data.metadata[i].gender;

            if (gender == null) {
                let bacteriaSumIndividual = sumArray(data.samples[i].sample_values);
                bacteriaSumNA.push(bacteriaSumIndividual);
                wFreqNA.push(data.metadata[i].wfreq);
            }

            else if (gender.toUpperCase() == "F") {
                let bacteriaSumIndividual = sumArray(data.samples[i].sample_values);
                bacteriaSumF.push(bacteriaSumIndividual);
                wFreqF.push(data.metadata[i].wfreq);
            }

            else if (gender.toUpperCase() == "M") {
                let bacteriaSumIndividual = sumArray(data.samples[i].sample_values);
                bacteriaSumM.push(bacteriaSumIndividual);
                wFreqM.push(data.metadata[i].wfreq);
            };

            var ethnicity = data.metadata[i].ethnicity;

            if (ethnicity == null) {
                continue;
            }

            else if (white.indexOf(ethnicity.toLowerCase()) >=0) {
                let bacteriaSumIndividual = sumArray(data.samples[i].sample_values);
                bacteriaSumW.push(bacteriaSumIndividual);
                wFreqW.push(data.metadata[i].wfreq);
            }

            else if (ethnicity.toLowerCase() == "black") {
                let bacteriaSumIndividual = sumArray(data.samples[i].sample_values);
                bacteriaSumB.push(bacteriaSumIndividual);
                wFreqB.push(data.metadata[i].wfreq);
            }

            else if (asian.indexOf(ethnicity.toLowerCase()) >= 0) {
                let bacteriaSumIndividual = sumArray(data.samples[i].sample_values);
                bacteriaSumA.push(bacteriaSumIndividual);
                wFreqA.push(data.metadata[i].wfreq);
            }

            else if (ethnicity.toLowerCase() == "hispanic") {
                let bacteriaSumIndividual = sumArray(data.samples[i].sample_values);
                bacteriaSumH.push(bacteriaSumIndividual);
                wFreqH.push(data.metadata[i].wfreq);
            };

            age.push(data.metadata[i].age);
            let bacteriaSumIndividual = sumArray(data.samples[i].sample_values);
            bacteriaSumAge.push(bacteriaSumIndividual);
            wFreqAge.push(data.metadata[i].wfreq);
        };

        var scatterText = data.names.map(number => `id ${number}`);

        var trace1 = {
            x: otuValues,
            y: otuId.map(id => `OTU ${id}`),
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };

        var layout1 = {
            title: "Top 10 OTU of Patient 940",
            xaxis: {title: "Count of OTU"},
            yaxis: {title: "OTU Id"}
        };

        var trace2 = {
            x: otuId,
            y: otuValues,
            mode: "markers",
            text: otuLabels,
            marker: {size: otuValues,
                    color: otuId}
        };

        var layout2 = {
            title: "Top 10 OTU of Patient 940",
            xaxis: {title: "OTU Id"},
            yaxis: {title: "Count of OTU"}
        };

        var trace3 = {
            title: {text: "Scrubs per Week"},
            domain: {x: [0, 1], y: [0, 1]},
            value: data.metadata[0].wfreq,
            type: "indicator",
            mode: "gauge",
            gauge: {
                axis: {range: [null, 9]},
                steps: [
                    {range: [0,1], color: "#FFFFCC"},
                    {range: [1,2], color: "#F7FFCC"},
                    {range: [2,3], color: "#EEFF99"},
                    {range: [3,4], color: "#BFFF80"},
                    {range: [4,5], color: "#99FF33"},
                    {range: [5,6], color: "#2BFF00"},
                    {range: [6,7], color: "#22CC00"},
                    {range: [7,8], color: "#1A9900"},
                    {range: [8,9], color: "#116600"},
                ]
            }

        };

        var layout3 = {
            title: "Belly Button Washing Frequency"
        };

        var trace4 = {
            y: bacteriaSumF,
            type: "box",
            name: "Female"
        };

        var trace5 = {
            y: bacteriaSumM,
            type: "box",
            name: "Male"
        };

        var trace6 = {
            y: bacteriaSumNA,
            type: "box",
            name: "null"
        };

        var layout4 = {
            title: "Bacteria Count by Gender",
            xaxis: {title: "Gender"},
            yaxis: {title: "Bacteria Count"}
        };

        var trace7 = {
            y: wFreqF,
            type: "box",
            name: "Female"
        };

        var trace8 = {
            y: wFreqM,
            type: "box",
            name: "Male"
        };

        var trace9 = {
            y: wFreqNA,
            type: "box",
            name: "null"
        };

        var layout5 = {
            title: "Washing Frequency by Gender",
            xaxis: {title: "Gender"},
            yaxis: {title: "Washing Frequency (per week)"}
        };

        var trace10 = {
            y: bacteriaSumW,
            type: "box",
            name: "White"
        };

        var trace11 = {
            y: bacteriaSumB,
            type: "box",
            name: "Black"
        };

        var trace12 = {
            y: bacteriaSumA,
            type: "box",
            name: "Asian"
        };

        var trace13 = {
            y: bacteriaSumH,
            type: "box",
            name: "Hispanic"
        };

        var layout6 = {
            title: "Bacteria Count by Ethnicity",
            xaxis: {title: "Ethnicity"},
            yaxis: {title: "Bacteria Count"}
        };

        var trace14 = {
            y: wFreqW,
            type: "box",
            name: "White"
        };

        var trace15 = {
            y: wFreqB,
            type: "box",
            name: "Black"
        };

        var trace16 = {
            y: wFreqA,
            type: "box",
            name: "Asian"
        };

        var trace17 = {
            y: wFreqH,
            type: "box",
            name: "Hispanic"
        };

        var layout7 = {
            title: "Washing Frequency by Ethnicity",
            xaxis: {title: "Ethnicity"},
            yaxis: {title: "Washing Frequency (per week)"}
        };
        
        var trace18 = {
            x: age,
            y: bacteriaSumAge,
            mode: "markers",
            type: "scatter",
            text: scatterText
        };

        var layout8 = {
            title: "Bacteria Count by Age",
            xaxis: {title: "Age"},
            yaxis: {title: "Bacteria Count"}
        };

        var trace19 = {
            x: age,
            y: wFreqAge,
            mode: "markers",
            type: "scatter",
            text: scatterText
        };

        var layout9 = {
            title: "Washing Frequency by Age",
            xaxis: {title: "Age"},
            yaxis: {title: "Washing Frequency (per week)"}
        };

        Plotly.newPlot("bar", [trace1], layout1);
        Plotly.newPlot("bubble", [trace2], layout2);
        Plotly.newPlot("gauge", [trace3], layout3);
        Plotly.newPlot("boxplot1", [trace4, trace5, trace6], layout4);
        Plotly.newPlot("boxplot2", [trace7, trace8, trace9], layout5);
        Plotly.newPlot("boxplot3", [trace10, trace11, trace12, trace13], layout6);
        Plotly.newPlot("boxplot4", [trace14, trace15, trace16, trace17], layout7);
        Plotly.newPlot("scatter1", [trace18], layout8);
        Plotly.newPlot("scatter2", [trace19], layout9);

        var idMetadata = data.metadata[0];

        for (var i = 0; i < Object.keys(idMetadata).length; i++) {
            var keys = Object.keys(idMetadata);
            var values = Object.values(idMetadata);
            var infoBox = d3.select("#sample-metadata");

            infoBox.append("p").text(`${keys[i]}: ${values[i]}`);
        };
    };

    
    init();
});

function optionChanged(id) {
    d3.json("https://camiloibanez.github.io/Belly-Button-Biodiversity/StarterCode/samples.json").then(function(data) {
    
    var idIndex = data.names.indexOf(id);
    
    var ids2 = data.samples[idIndex].otu_ids;
    var values2 = data.samples[idIndex].sample_values;
    var labels2 = data.samples[idIndex].otu_labels;

    var otus2 = ids2.map(function(value, index) {
        return {"id": value, "count": values2[index], "name": labels2[index]};
    });

    otus2.sort((a,b) => b.count - a.count);

    var newValues= otus2.map(OTU => OTU.count).slice(0,10).reverse();
    var newId = otus2.map(OTU => OTU.id).slice(0,10).reverse();
    var newOTUId = newId.map(id => `OTU ${id}`);
    var newLabels = otus2.map(OTU => OTU.name).slice(0,10).reverse();

    var newLayout = {
        title: `Top 10 OTU of Patient ${id}`
    };

    var newWFreq = data.metadata[idIndex].wfreq;
    
    Plotly.restyle("bar", {x: [newValues], y: [newOTUId], text: [newLabels]});
    Plotly.relayout("bar", newLayout);

    Plotly.restyle("bubble", {x: [newId], y: [newValues], text: [newLabels]});
    Plotly.relayout("bubble", newLayout);

    Plotly.restyle("gauge", {value: [newWFreq]});

    d3.select("#sample-metadata").html("");

    var idMetadata = data.metadata[idIndex];

    for (var i = 0; i < Object.keys(idMetadata).length; i++) {
        var keys = Object.keys(idMetadata);
        var values = Object.values(idMetadata);
        var infoBox = d3.select("#sample-metadata");

        infoBox.append("p").text(`${keys[i]}: ${values[i]}`);
    };
})};

d3.select("#selDataset").on("change", optionChanged(this.value));