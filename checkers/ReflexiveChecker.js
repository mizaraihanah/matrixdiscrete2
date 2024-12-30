// checkers/ReflexiveChecker.js

export class ReflexiveChecker {
    /**
     * Checks if the relation is reflexive.
     * @param {number[][]} matrix - The relation matrix.
     * @param {number} n - The size of the matrix.
     * @returns {boolean} True if reflexive, else false.
     */
    check(matrix, n) {
        for (let i = 0; i < n; i++) {
            if (matrix[i][i] !== 1) {
                return false;
            }
        }
        return true;
    }
}
