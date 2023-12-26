var taskManager = class taskManager {
    constructor(windowID) {
        this.windowID = windowID;
        this.parentWindow = document.getElementById(windowID);
        this.windowDocument = this.parentWindow.getElementsByTagName('iframe')[0].contentDocument;
        this.windowTitle = this.parentWindow.getElementsByTagName('div')[3];
        this.backButton = this.parentWindow.getElementsByClassName('backButton')[0];
        this.forwardButton = this.parentWindow.getElementsByClassName('forwardButton')[0];
        this.refreshButton = this.parentWindow.getElementsByClassName('refreshButton')[0];
        this.stopButton = this.parentWindow.getElementsByClassName('stopButton')[0];
        this.homeButton = this.parentWindow.getElementsByClassName('homeButton')[0];
        let height = 460, width = 965;
        this.parentWindow.style.height = `${height}px`;
        this.parentWindow.style.width = `${width}px`;
        this.parentWindow.style.top = `calc(50% - ${height/2}px)`;
        this.parentWindow.style.left = `calc(50% - ${width/2}px)`;
        this.xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
        this.yValuesCPU = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.yValuesMemory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.previousCPUValue = 0;
        this.CPUUsageChart = null;
        this.backButton.onclick = () => this.back();
        this.forwardButton.onclick = () => this.forward();
        this.refreshButton.onclick = () => this.refresh();
        this.stopButton.onclick = () => this.stop();
        this.homeButton.onclick = () => this.home();
        this.load();
    }

    toggleCheckRows(event) {
        let ids = this.windowDocument.querySelectorAll('.checkedApps');

        for (let i = 0; i < ids.length; i++) {
            ids[i].checked = event.target.checked;
        }
    }

    loadCPU() {
        if (!(this.windowDocument === undefined || this.windowDocument == null)) {
            if (window.performance && window.performance.now) {
                let cpuUsage = window.performance.now();
                this.windowDocument.querySelector("#cpu-usage").textContent = `Uso de CPU: ${((cpuUsage - this.previousCPUValue) / 50).toFixed(2)} %`;
                this.windowDocument.querySelector("#cpu-usage").classList.remove('d-none');
                this.addData((cpuUsage - this.previousCPUValue) / 50, 0);
                this.previousCPUValue = cpuUsage;
            }

            if (window.performance && window.performance.memory) {
                let memoryUsage = window.performance.memory.usedJSHeapSize / (1024 * 1024 * 1024);
                this.windowDocument.querySelector("#memory-usage").textContent = `Memoria en uso: ${(memoryUsage).toFixed(2)} GB`;
                this.windowDocument.querySelector("#memory-usage").classList.remove('d-none');
                this.addData(memoryUsage, 1);
            }

            this.windowDocument.querySelector('#processor-number').textContent = `Procesadores lógicos: ${navigator.hardwareConcurrency}`;
        }

    }

    loadTasks() {
        let tasks = getCachedWindows();
        this.windowDocument.querySelector('#processesCount').innerHTML = '&nbsp;' + tasks.length;
        let openApps = [...new Set(tasks.map(item => item.dockIcon))];
        let windows = '';
        let group = `
    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
        <li>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th class="defaultFontColor" scope="col"><input class="form-check-input" type="checkbox" onchange="taskManagerCode.toggleCheckRows(event)" ></th>
                        <th class="defaultFontColor" scope="col">&nbsp</th>
                        <th class="defaultFontColor" scope="col">ID proceso</th>
                        <th class="defaultFontColor" scope="col">Nombre</th>
                        <th class="defaultFontColor" scope="col">Memoria</th>
                    </tr>
                </thead>
                <tbody>
                    replaceContent
                </tbody>
            </table>
        </li>
    </ul>
                    `;
        let tareas = this.windowDocument.querySelector('#activities-collapse');
        tareas.innerHTML = "";
        openApps.forEach((app) => {
            tasks.forEach((x) => {
                if (x.dockIcon == app) {
                    let systemApp = window.parent.systemApps.content.filter((x) => { if (x.internalName == `${app}.app`) { return x } })[0];
                    windows += `
    <tr>
        <th class="defaultFontColor" scope="row"><input class="form-check-input checkedApps" type="checkbox" value="${x.windowID}" ></th>
        <td class="defaultFontColor"><img src="${systemApp.icon}" style="height: 12pt; width: 12pt;"/></td>
        <td class="defaultFontColor">${x.windowID}</td>
        <td class="defaultFontColor">${systemApp.name}</td>
        <td class="defaultFontColor">${new Blob([JSON.stringify(x.history.urlList)]).size} bytes</td>
    </tr>
                            `;
                }
            });
        });
        group = group.replaceAll('replaceContent', windows);
        tareas.innerHTML += group;
    }

    closeApp(windowID) {
        let cW = getCachedWindow(windowID);
        //Remove from cache
        removeCachedWindow(windowID);

        //Query cache to remove or not dock indicator
        let cWs = getCachedWindows();
        let openWindows = cWs.filter((obj) => {
            return obj.dockIcon == cW.dockIcon;
        });
        if (openWindows.length == 0) {
            document.getElementById(cW.dockIcon).classList.remove('li-on');
        }

        //Undraw the window
        document.getElementById(windowID).remove();
    }

    addData(newValue, datasetIndex) {
        let newData = this.CPUUsageChart.data.datasets[datasetIndex].data;
        if (newData.length >= 60) {
            newData = newData.slice(1, 60);
        }
        newData.push(newValue);
        this.CPUUsageChart.data.datasets[datasetIndex].data = newData;
        this.CPUUsageChart.update();
    }

    loadCPUGraph() {
        let chartConfig = {
            type: "line",
            data: {
                labels: this.xValues,
                datasets: []
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                dataset: {
                    label: { color: '#ffffff' }
                },
                scales: {
                    y: {
                        border: {
                            display: false
                        },
                        grid: {
                            color: getSetting(keySettings.fontColor),
                        },
                        ticks: {
                            color: getSetting(keySettings.fontColor),
                            font: {
                                family: 'Varela Round',
                                size: 9,
                                style: 'normal'
                            }
                        }
                    },
                    x: {
                        border: {
                            display: false
                        },
                        grid: {
                            color: getSetting(keySettings.fontColor),
                        },
                        ticks: {
                            color: getSetting(keySettings.fontColor),
                            font: {
                                family: 'Varela Round',
                                size: 9,
                                style: 'normal'
                            }
                        }
                    }
                },
                animation: {
                    duration: 0
                }
            }
        };
        let CPUUsageDataSet = {
            label: 'Uso de CPU',
            fill: true,
            lineTension: 0,
            backgroundColor: "rgba(95,171,126,0.8)",
            borderColor: "rgba(95,171,126,1)",
            data: this.yValuesCPU
        };
        let memoryUsageDataSet = {
            label: 'Uso de memoria',
            fill: true,
            lineTension: 0,
            backgroundColor: "rgba(244,96,93,0.8)",
            borderColor: "rgba(244,96,93,1)",
            data: this.yValuesMemory,
            hidden: true
        };
        if(window.performance && window.performance.now) {
            chartConfig.data.datasets.push(CPUUsageDataSet);
        }
        if(window.performance && window.performance.memory) {
            chartConfig.data.datasets.push(memoryUsageDataSet);
        }
        this.CPUUsageChart = new Chart(this.windowDocument.getElementById("CPUUsage"), chartConfig);
    }

    load() {
        this.windowTitle.innerHTML = 'Monitor del sistema';
        this.backButton.style.display = "none";
        this.forwardButton.style.display = "none";
        this.refreshButton.title = "Refrescar tareas";
        this.stopButton.title = "Cerrar tarea";
        this.homeButton.style.display = "none";

        this.loadTasks();
        this.loadCPUGraph();
        var t = this;
        setInterval(function(){t.loadCPU();}, 1000);
        this.loadCPU();
        showWindow(this.parentWindow);
    }

    back() {

    }

    forward() {

    }

    refresh() {
        this.loadTasks();
    }

    stop() {
        let ids = this.windowDocument.querySelectorAll('.checkedApps:checked');
        for (let i = 0; i < ids.length; i++) {
            this.closeApp(ids[i].value);
        }
        this.loadTasks();
    }

    home() {

    }
}