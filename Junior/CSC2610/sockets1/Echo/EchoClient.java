import java.io.*;
import java.net.*;

class EchoClient {
  public static void main(String[] args) {
    String host = "localhost";
    try {
      Socket s = new Socket(host, 8008);
      BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
      PrintWriter out = new PrintWriter(new OutputStreamWriter(s.getOutputStream()));
      
      for (int i = 0; i <= 10; i++) {
        System.out.println("Sending: line " + i);
        out.println("line " + i);
        out.flush();
      }
      out.println("BYE");
      out.flush();
      
      String str = null;
      while ((str = in.readLine()) != null) {
        System.out.println(str);
      }
      
      s.close();
    }
    catch (Exception e) {
      e.printStackTrace();
    }
  }
}