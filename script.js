// script.js

import { ReflexiveChecker } from './checkers/ReflexiveChecker.js';
import { SymmetricChecker } from './checkers/SymmetricChecker.js';
import { AsymmetricChecker } from './checkers/AsymmetricChecker.js';
import { AntisymmetricChecker } from './checkers/AntisymmetricChecker.js';
import { TransitiveChecker } from './checkers/TransitiveChecker.js';

/**
 * Event Listeners
 */
const generateBtn = document.getElementById('generate');
const checkBtn = document.getElementById('check');
const resetBtn = document.getElementById('reset');

if (generateBtn && checkBtn && resetBtn) {
    generateBtn.addEventListener('click', generateMatrix);
    checkBtn.addEventListener('click', checkProperties);
    resetBtn.addEventListener('click', resetMatrix);
    console.log("Event listeners attached.");
} else {
    console.error("One or more buttons not found. Check element IDs in index.html.");
}

/**
 * Generates the relation matrix based on user-specified size.
 */
function generateMatrix() {
    console.log("Generate Matrix button clicked."); // Debugging
    const size = parseInt(document.getElementById('size').value);
    const container = document.getElementById('matrix-container');
    container.innerHTML = ''; // Clear previous matrix

    if (isNaN(size) || size < 1 || size > 10) {
        alert("Please enter a matrix size between 1 and 10.");
        return;
    }

    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const emptyHeader = document.createElement('th');
    headerRow.appendChild(emptyHeader); // Top-left empty cell

    for (let j = 1; j <= size; j++) {
        const th = document.createElement('th');
        th.scope = "col";
        th.innerText = j;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    for(let i = 0; i < size; i++) {
        const row = document.createElement('tr');
        const rowHeader = document.createElement('th');
        rowHeader.scope = "row";
        rowHeader.innerText = i + 1;
        row.appendChild(rowHeader);

        for(let j = 0; j < size; j++) {
            const cell = document.createElement('td');
            const inputGroup = document.createElement('div');
            inputGroup.classList.add('input-group');

            const decrementBtn = document.createElement('button');
            decrementBtn.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
            decrementBtn.type = 'button';
            decrementBtn.innerHTML = '&minus;'; // Minus symbol
            decrementBtn.setAttribute('aria-label', `Decrease relation from ${i+1} to ${j+1}`);

            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.max = '1';
            input.value = '0';
            input.classList.add('form-control', 'form-control-sm');
            input.setAttribute('aria-label', `Relation from ${i+1} to ${j+1}`);

            const incrementBtn = document.createElement('button');
            incrementBtn.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
            incrementBtn.type = 'button';
            incrementBtn.innerHTML = '&plus;'; // Plus symbol
            incrementBtn.setAttribute('aria-label', `Increase relation from ${i+1} to ${j+1}`);

            // Event listener for decrement button
            decrementBtn.addEventListener('click', () => {
                let currentValue = parseInt(input.value);
                if (currentValue > 0) {
                    input.value = currentValue - 1;
                }
            });

            // Event listener for increment button
            incrementBtn.addEventListener('click', () => {
                let currentValue = parseInt(input.value);
                if (currentValue < 1) {
                    input.value = currentValue + 1;
                }
            });

            // Restrict input to 0 or 1
            input.addEventListener('input', function() {
                if (this.value !== '0' && this.value !== '1') {
                    this.value = '0';
                }
            });

            // Assemble the input group
            inputGroup.appendChild(decrementBtn);
            inputGroup.appendChild(input);
            inputGroup.appendChild(incrementBtn);

            cell.appendChild(inputGroup);
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    container.appendChild(table);

    // Clear previous results and digraph
    document.getElementById('results').innerHTML = '';
    document.getElementById('cy').innerHTML = '';
}

/**
 * Retrieves the matrix values from the input fields.
 * @returns {number[][]} The relation matrix.
 */
function getMatrix() {
    console.log("Retrieving matrix values."); // Debugging
    const table = document.querySelector('#matrix-container table');
    const matrix = [];
    if(!table) {
        console.warn("Matrix table not found."); // Debugging
        return matrix;
    }

    const rows = table.rows;
    for(let i = 1; i < rows.length; i++) { // Start from 1 to skip header
        const row = [];
        const cells = rows[i].cells;
        for(let j = 1; j < cells.length; j++) { // Start from 1 to skip row header
            const input = cells[j].querySelector('input[type="number"]');
            const val = parseInt(input.value);
            row.push(val === 1 ? 1 : 0);
        }
        matrix.push(row);
    }
    console.log("Matrix Retrieved:", matrix); // Debugging
    return matrix;
}

/**
 * Checks all properties of the relation matrix using separate classes.
 */
function checkProperties() {
    console.log("Check Properties button clicked."); // Debugging
    const matrix = getMatrix();
    const n = matrix.length;
    if (n === 0) {
        alert("Please generate and fill the matrix before checking properties.");
        return;
    }

    // Instantiate each checker class
    try {
        const reflexiveChecker = new ReflexiveChecker();
        const symmetricChecker = new SymmetricChecker();
        const asymmetricChecker = new AsymmetricChecker();
        const antisymmetricChecker = new AntisymmetricChecker();
        const transitiveChecker = new TransitiveChecker();

        // Perform checks
        const reflexive = reflexiveChecker.check(matrix, n);
        const symmetric = symmetricChecker.check(matrix, n);
        const asymmetric = asymmetricChecker.check(matrix, n);
        const antisymmetric = antisymmetricChecker.check(matrix, n);
        const transitive = transitiveChecker.check(matrix, n);

        console.log("Check Results:", { reflexive, symmetric, asymmetric, antisymmetric, transitive }); // Debugging

        // Prepare Results with Bootstrap Badge Classes
        let resultHTML = `<p><strong>Reflexive:</strong> <span class="badge ${reflexive ? 'bg-success' : 'bg-danger'}">${reflexive ? 'Yes' : 'No'}</span></p>`;
        resultHTML += `<p><strong>Symmetric:</strong> <span class="badge ${symmetric ? 'bg-success' : 'bg-danger'}">${symmetric ? 'Yes' : 'No'}</span></p>`;
        resultHTML += `<p><strong>Asymmetric:</strong> <span class="badge ${asymmetric ? 'bg-success' : 'bg-danger'}">${asymmetric ? 'Yes' : 'No'}</span></p>`;
        resultHTML += `<p><strong>Antisymmetric:</strong> <span class="badge ${antisymmetric ? 'bg-success' : 'bg-danger'}">${antisymmetric ? 'Yes' : 'No'}</span></p>`;
        resultHTML += `<p><strong>Transitive:</strong> <span class="badge ${transitive ? 'bg-success' : 'bg-danger'}">${transitive ? 'Yes' : 'No'}</span></p>`;

        document.getElementById('results').innerHTML = resultHTML;

        // Generate Digraph
        generateDigraph(matrix);
    } catch (error) {
        console.error("Error during property checks:", error);
        alert("An error occurred while checking properties. Please check the console for details.");
    }
}

/**
 * Resets the matrix and results to their initial states.
 */
function resetMatrix() {
    console.log("Reset button clicked."); // Debugging
    document.getElementById('matrix-container').innerHTML = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('cy').innerHTML = '';
    document.getElementById('size').value = '3'; // Reset to default size
}

/**
 * Generates a digraph using Cytoscape.js based on the relation matrix.
 * @param {number[][]} matrix - The relation matrix.
 */
function generateDigraph(matrix) {
    console.log("Generating digraph."); // Debugging
    const cyContainer = document.getElementById('cy');
    cyContainer.innerHTML = ''; // Clear previous digraph

    const elements = getElements(matrix);
    try {
        const cy = cytoscape({
            container: cyContainer,
            elements: elements,
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#4CAF50',
                        'label': 'data(label)',
                        'color': 'white',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '14px'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#555',
                        'target-arrow-color': '#555',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ],
            layout: {
                name: 'cose',
                padding: 10,
                animate: true
            },
            userZoomingEnabled: true,
            userPanningEnabled: true,
            boxSelectionEnabled: false
        });
        console.log("Digraph generated successfully."); // Debugging
    } catch (error) {
        console.error("Error generating digraph:", error);
        alert("An error occurred while generating the digraph. Please check the console for details.");
    }
}

/**
 * Converts the relation matrix into Cytoscape.js elements.
 * @param {number[][]} matrix - The relation matrix.
 * @returns {Object[]} Array of elements for Cytoscape.js.
 */
function getElements(matrix) {
    console.log("Converting matrix to Cytoscape elements."); // Debugging
    const elements = [];
    const n = matrix.length;

    // Create nodes
    for(let i = 0; i < n; i++) {
        elements.push({ data: { id: `n${i}`, label: `${i+1}` } });
    }

    // Create edges based on the relation matrix
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(matrix[i][j] === 1) {
                elements.push({ data: { source: `n${i}`, target: `n${j}` } });
            }
        }
    }

    console.log("Cytoscape elements:", elements); // Debugging
    return elements;
}

// Optional: Adjust Cytoscape.js container size on window resize for better responsiveness
window.addEventListener('resize', () => {
    const cyContainer = document.getElementById('cy');
    if(cyContainer && cyContainer.cytoscape) {
        cyContainer.cytoscape.resize();
    }
});
