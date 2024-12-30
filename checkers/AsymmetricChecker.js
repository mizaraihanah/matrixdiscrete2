// checkers/AsymmetricChecker.js

export class AsymmetricChecker {
    /**
     * Checks if the relation is asymmetric.
     * @param {number[][]} matrix - The relation matrix.
     * @param {number} n - The size of the matrix.
     * @returns {boolean} True if asymmetric, else false.
     */
    check(matrix, n) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[i][j] === 1 && matrix[j][i] === 1 && i !== j) {
                    return false;
                }
            }
        }
        return true;
    }
}
