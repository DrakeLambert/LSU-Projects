import java.io.*;
import java.util.Scanner;
import java.util.ArrayList;

public class MagicSquareChecker {
    public static void main(String[] args) throws IOException {
        Scanner fileIn = new Scanner(new File(args[0]));
        System.out.println();
        ArrayList<Integer> magicSquare = new ArrayList<>();

        while (fileIn.hasNextInt()) {
            magicSquare.add(fileIn.nextInt());
        }
        int dimension = (int) Math.sqrt(magicSquare.size());
        boolean containsAll = true;
        for (int i = 1; i <= magicSquare.size(); i++) {
            if (!magicSquare.contains(i)) {
                containsAll = false;
            }
        }
        if (dimension != Math.sqrt(magicSquare.size()) || !containsAll) {
            System.out.println("Not a magic square");
        } else {
            int[] rowSums = new int[dimension], colSums = new int[dimension];
            int sumDiagMinor = 0, sumDiagMajor = 0, row = dimension - 1, col = dimension / 2, currentCol = 1;
            for (int index = 0; index < Math.pow(dimension, 2); index++) {
                rowSums[index / dimension] = rowSums[index / dimension] + magicSquare.get(index);
                colSums[(index % dimension)] = colSums[(index % dimension)] + magicSquare.get(index);
                if (index / dimension == (index % dimension)) {
                    sumDiagMajor = sumDiagMajor + magicSquare.get(index);
                }
                if (index / dimension + (index % dimension) == dimension - 1) {
                    sumDiagMinor = sumDiagMinor + magicSquare.get(index);
                }
                System.out.printf("%-6d", magicSquare.get(index));
                if (currentCol == dimension) {
                    System.out.println();
                    currentCol = 0;
                }
                currentCol++;
            }
            System.out.println();
            if (sumDiagMajor == sumDiagMinor) {
                boolean isMagicSquare = true;
                for (int i = 0; i < rowSums.length; i++) {
                    if (rowSums[i] != sumDiagMajor || colSums[i] != sumDiagMajor) {
                        isMagicSquare = false;
                        i = rowSums.length;
                    }
                }
                if (isMagicSquare)
                    System.out.printf("A %d by %d Magic Square%n", dimension, dimension);
                else
                    System.out.println("Not a magic square");
            } else {
                System.out.println("Not a magic square");
            }
            fileIn.close();
        }
    }
}