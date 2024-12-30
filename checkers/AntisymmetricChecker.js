// checkers/AntisymmetricChecker.js

export class AntisymmetricChecker {
    /**
     * Checks if the relation is antisymmetric.
     * @param {number[][]} matrix - The relation matrix.
     * @param {number} n - The size of the matrix.
     * @returns {boolean} True if antisymmetric, else false.
     */
    check(matrix, n) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i !== j && matrix[i][j] === 1 && matrix[j][i] === 1) {
                    return false;
                }
            }
        }
        return true;
    }
}
