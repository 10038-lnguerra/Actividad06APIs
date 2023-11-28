class ExternalDataComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.getDataFromAPI();
    }

    async getDataFromAPI() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            this.displayData(data);
        } catch (error) {
            console.error(error.message);
            this.displayError();
        }
    }
    displayData(data) {
        const template = document.createElement('template');
        template.innerHTML = `
            <div>
                <h1>Integración de Datos Externos</h1>
                <h2>Lista de Usuarios</h2>
                <ul>
                    ${data.map(task => `<li>${task.title}</li>`).join('')}
                </ul>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    displayError() {
        console.error('Ocurrió un error durante la solicitud de datos.');
    }
}

customElements.define('external-data-component', ExternalDataComponent);
