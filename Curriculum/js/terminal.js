var terminal = class terminal {

    constructor(windowID) {
        this.parentWindow = window.parent.document.getElementById(windowID);
        this.windowTitle = this.parentWindow.getElementsByTagName('div')[3];
        this.windowDocument = this.parentWindow.getElementsByTagName('iframe')[0].contentDocument;
        this.backButton = this.parentWindow.getElementsByClassName('backButton')[0];
        this.forwardButton = this.parentWindow.getElementsByClassName('forwardButton')[0];
        this.refreshButton = this.parentWindow.getElementsByClassName('refreshButton')[0];
        this.stopButton = this.parentWindow.getElementsByClassName('stopButton')[0];
        this.homeButton = this.parentWindow.getElementsByClassName('homeButton')[0];
        this.backButton.style.display = 'none';
        this.forwardButton.style.display = 'none';
        this.refreshButton.style.display = 'none';
        this.stopButton.style.display = 'none';
        this.homeButton.style.display = 'none';

        let height = 450, width = 750;
        this.parentWindow.style.height = `${height}px`;
        this.parentWindow.style.width = `${width}px`;
        this.parentWindow.style.top = `calc(50% - ${height/2}px)`;
        this.parentWindow.style.left = `calc(50% - ${width/2}px)`;

        this.windowTitle.innerHTML = 'Terminal';
        this.historyIndex = (JSON.parse(localStorage.getItem('commandHistory')) || []).length;

        this.console = this.windowDocument.getElementById('console');
        this.outputDiv = this.windowDocument.getElementById('output');
        this.inputField = this.windowDocument.getElementById('command-input');

        // Objeto que actuará como entorno para las variables
        this.environment = {};
        const self = this;
        this.inputField.addEventListener('keydown', function (event) {
            let history = JSON.parse(localStorage.getItem('commandHistory')) || [];

            if (event.key == 'Backspace') {
                if (event.target.value == 'JS Shell > ') {
                    event.preventDefault();
                    return;
                }
            }
            if (event.key === 'Enter') {
                event.preventDefault();
                const command = event.target.value;
                event.target.value = 'JS Shell > ';

                // Ejecutar el comando
                self.executeCommand(command);

                // Agregar el comando al historial
                history.push(command);
                localStorage.setItem('commandHistory', JSON.stringify(history));
                self.historyIndex = history.length;

                self.console.scrollTo(0, self.console.scrollHeight);
            } else if (event.key === 'ArrowUp') {
                // Navegar hacia arriba en el historial
                if (self.historyIndex > 0) {
                    self.historyIndex--;
                    event.target.value = history[self.historyIndex];
                }
            } else if (event.key === 'ArrowDown') {
                // Navegar hacia abajo en el historial
                if (self.historyIndex < history.length - 1) {
                    self.historyIndex++;
                    event.target.value = history[self.historyIndex];
                } else {
                    // Si llegamos al final, borrar el campo de entrada
                    self.historyIndex = history.length;
                    event.target.value = 'JS Shell > ';
                }
            }
        });

        showWindow(this.parentWindow);
    }






    executeCommand(command) {
        command = command.replace('JS Shell > ', '');
        this.outputDiv.innerHTML += 'JS Shell > ' + command + '<br>';

        if (command === 'exit') {
            this.parentWindow.querySelector('.btn-danger').click();
        }

        if (command.length == 0) {
            this.outputDiv.innerHTML += 'Error: comando no válido <br>';
            return;
        }

        if (command === 'clear') {
            this.outputDiv.innerHTML = '';
            return;
        }

        if (command == 'help') {
            this.outputDiv.innerHTML += 'Comandos disponibles: <br>';
            this.outputDiv.innerHTML += '<b>createWindowsCache()</b> - Crea una nueva caché vacía para la gestión de aplicaciones abiertas <br>'
            this.outputDiv.innerHTML += '<b>getCachedWindow(windowID: number)</b> - Obtiene la ventana cacheada pasada por parámetro <br>'
            this.outputDiv.innerHTML += '<b>addCachedWindow(cachedWindow: cachedWindow)</b> - Añade una nueva aplicación abierta a la memoria caché <br>'
            this.outputDiv.innerHTML += '<b>removeCachedWindow(windowID: number)</b> - Elimina una aplicación de la memoria caché <br>'
            this.outputDiv.innerHTML += '<b>getCachedWindows()</b> - Obtiene la caché de aplicaciones abiertas <br>'
            this.outputDiv.innerHTML += '<b>addCachedWindowHistoryURL(windowID: number, url: string)</b> - Añade una nueva dirección al historial de direcciones de la ventana indicada <br>'
            this.outputDiv.innerHTML += '<b>backHistoryIndex(windowID: number)</b> - Navega hacia atrás en el historial de direcciones de la ventana indicada <br>'
            this.outputDiv.innerHTML += '<b>forwardHistoryIndex(windowID: number)</b> - Navega hacia delante en el historial de direcciones de la ventana indicada <br>'
            this.outputDiv.innerHTML += '<b>updateCachedWindowStatus(windowID: number, windowStatus: windowStatus)</b> - Actualiza el estado de la ventana seleccionada <br>'
            this.outputDiv.innerHTML += '<b>getSystemSettings()</b> - Obtiene los ajustes aplicados del sistema <br>'
            this.outputDiv.innerHTML += '<b>getSetting(key: keySettings)</b> - Obtiene el ajuste indicado <br>'
            this.outputDiv.innerHTML += '<b>setSetting(key: keySettings, value: string)</b>  - Establece el ajuste indicado <br>'
            this.outputDiv.innerHTML += '<b>showWindow(window: HTMLElement)</b> - Muestra la ventana indicada <br>'
            this.outputDiv.innerHTML += '<b>reloadColors()</b> - Recarga los colores del sistema <br>'
            this.outputDiv.innerHTML += '<b>setColorStyles()</b> - Establece los colores del sistema <br>'
            this.outputDiv.innerHTML += '<b>setWindowColor()</b> - Establece el color de las ventanas del sistema <br>'
            this.outputDiv.innerHTML += '<b>setFontColor()</b> - Establece el color de las fuente del sistema <br>'

            return;
        }





        let result;
        try {
            result = eval.call(this.environment, command);

            if ((command.includes('var ') || command.includes('let ') || command.includes('const ')) && command.includes('=')) {
                const parts = command.split(/\s+/);
                const varName = parts[1];
                this.environment[varName] = result;
                this.outputDiv.innerHTML += 'Variable declarada.<br>';
            } else {
                if (typeof result === 'object') {
                    this.outputDiv.innerHTML += 'Propiedades del objeto:<br>';
                    for (const prop in result) {
                        this.outputDiv.innerHTML += this.getPropertyHtml(result, prop);
                    }
                    this.outputDiv.innerHTML += '<br>';
                } else {
                    this.outputDiv.innerHTML += String(result) + '<br>';
                }
            }
        } catch (error) {
            this.outputDiv.innerHTML += command + '<br>';
            this.outputDiv.innerHTML += 'Error: ' + error.message + '<br>';
        }

        this.outputDiv.scrollTop = this.outputDiv.scrollHeight;

        if (result === this.environment) {
            this.outputDiv.innerHTML += 'Propiedades del objeto:<br>';
            for (const prop in result) {
                this.outputDiv.innerHTML += `${prop}: ${result[prop]}<br>`;
            }
        }
    }

    getPropertyHtml(obj, prop) {
        let propertyHtml = '';
        if (typeof obj[prop] === 'object' && Object.keys(obj[prop]).length > 0) {
            // Generar un ID único para cada elemento div
            const uniqueId = `prop_${prop}_${Math.random().toString(36).substr(2, 9)}`;

            // Si la propiedad es un objeto con propiedades, mostrar una flecha de expansión
            propertyHtml += `${prop}: <span class="expand-property" onclick="terminal.expandProperty('${uniqueId}')">&#9654;</span><br>`;
            propertyHtml += `<div id="${uniqueId}" style="margin-left: 20px; display: none;">`;
            for (const subProp in obj[prop]) {
                propertyHtml += this.getPropertyHtml(obj[prop], subProp);
            }
            propertyHtml += `</div>`;
        } else {
            // Mostrar la propiedad normalmente
            propertyHtml += `${prop}: ${obj[prop]}<br>`;
        }
        return propertyHtml;
    }

    expandProperty(uniqueId) {
        const expandedDiv = this.windowDocument.querySelector(`#${uniqueId}`);
        if (expandedDiv.style.display === 'none') {
            expandedDiv.style.display = 'block';
        } else {
            expandedDiv.style.display = 'none';
        }
    }

}