// checkers/SymmetricChecker.js

export class SymmetricChecker {
    /**
     * Checks if the relation is symmetric.
     * @param {number[][]} matrix - The relation matrix.
     * @param {number} n - The size of the matrix.
     * @returns {boolean} True if symmetric, else false.
     */
    check(matrix, n) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][j] !== matrix[j][i]) {
                    return false;
                }
            }
        }
        return true;
    }
}
