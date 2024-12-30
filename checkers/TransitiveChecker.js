// checkers/TransitiveChecker.js

export class TransitiveChecker {
    /**
     * Checks if the relation is transitive.
     * @param {number[][]} matrix - The relation matrix.
     * @param {number} n - The size of the matrix.
     * @returns {boolean} True if transitive, else false.
     */
    check(matrix, n) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][j] === 1) {
                    for (let k = 0; k < n; k++) {
                        if (matrix[j][k] === 1 && matrix[i][k] !== 1) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
}
