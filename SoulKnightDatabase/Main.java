import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;

import java.net.InetSocketAddress;
import java.util.Map;

/*
//For compiling on the shell on repl: Same on mac
javac -cp sqlite-jdbc-3.23.1.jar: Main.java
java -cp sqlite-jdbc-3.23.1.jar: Main

//Use for windows
javac -cp sqlite-jdbc-3.23.1.jar; Main.java
java -cp sqlite-jdbc-3.23.1.jar; Main
*/
public class Main {

    public static void main(String[] args) throws IOException {

      // create a port - our Gateway
      int port = 8500;
      
      //create the HTTPserver object
      HttpServer server = HttpServer.create(new InetSocketAddress(port),0);
      
      Database db = new Database("jdbc:sqlite:SKGuide.db");
      
      //create a route handler to repond the a request
      // this is our default route
      server.createContext("/", new RouteHandler("Default route handler. No route specified.....") );

     
      /*
        /heroes
        route gets all records from hero table & each hero's starting weapons
      */
      String sql1 = "SELECT * FROM heroes INNER JOIN weapons ON heroes.StartWeaponID = weapons.WeaponID;";
      server.createContext("/heroes", new RouteHandler(db,sql1) );
     
      /*
        /heroes/skills
        route gets all skills records (from skills table) of each hero
      */
      String sql2 = "SELECT heroes.HeroName, heroes.HeroImage, activeSkills.*, passiveSkills.* FROM heroes INNER JOIN activeSkills, passiveSkills ON heroes.PassiveSkillID = passiveSkills.PassiveSkillID AND heroes.ActiveSkillID = activeSkills.ActiveSkillID;";
      server.createContext("/heroes/skills", new RouteHandler(db,sql2) );

      /*
        /weapons
        route gets all records from weapons table
      */
      String sql3 = "SELECT * FROM weapons INNER JOIN weaponTypes ON weapons.Type = weaponTypes.WeaponTypeName;";
      server.createContext("/weapons", new RouteHandler(db, sql3));
      
      //Start the server
      server.start();

      System.out.println("Server is listening on port "+port);
      

      

      
    }    
}


