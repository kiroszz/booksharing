package gdut.imis.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import gdut.imis.DBUtils.MybatisUtils;
import gdut.imis.domain.Favorite;
import org.apache.ibatis.session.SqlSession;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class FindFavoriteServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        ObjectMapper mapper = new ObjectMapper();
        req.setCharacterEncoding("utf-8");
        SqlSession session = MybatisUtils.getSession();
        Favorite favorite = new Favorite();
        favorite.setMusicid(req.getParameter("musicid"));
        favorite.setUsername(req.getParameter("username"));

        Favorite find = session.selectOne("gdut.imis.findFavorite", favorite);
        session.close();

        if (find != null){
            String registerJson = mapper.writeValueAsString("该音乐已喜欢");
            resp.setContentType("application/json;charset=utf-8");
            PrintWriter out = resp.getWriter();
            out.write(registerJson);
            out.close();
        }else {
            String registerJson = mapper.writeValueAsString("该音乐未喜欢");
            resp.setContentType("application/json;charset=utf-8");
            PrintWriter out = resp.getWriter();
            out.write(registerJson);
            out.close();
        }


    }
}
