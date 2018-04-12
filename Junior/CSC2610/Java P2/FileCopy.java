import java.io.*;

public class FileCopy {
    public static void main(String[] args) throws IOException {
        FileReader freader = new FileReader("./Mercury.txt");
        BufferedReader reader = new BufferedReader(freader);
        FileWriter fwriter = new FileWriter("./Mercury-2.txt");
        BufferedWriter writer = new BufferedWriter(fwriter);

        String nextLine = reader.readLine();
        while (nextLine != null) {
            writer.write(nextLine + "\n");
            nextLine = reader.readLine();
        }
        reader.close();
        writer.close();
    }
}