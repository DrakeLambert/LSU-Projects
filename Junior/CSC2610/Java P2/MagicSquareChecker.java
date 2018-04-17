import java.io.*;

public class FileCopy {
    public static void main(String[] args) throws IOException {
        byte[] buffer = new byte[1000];

        FileInputStream inputStream = new FileInputStream(args[1]);
        FileOutputStream outputStream = new FileOutputStream(args[1] + " - 2");

        int read = inputStream.read(buffer);
        while (read != -1) {
            outputStream.write(buffer, 0, read);
        }
        inputStream.close();
        outputStream.close();
    }
}