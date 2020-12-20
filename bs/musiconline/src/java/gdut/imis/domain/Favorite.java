package gdut.imis.domain;

public class Favorite {

    private String username;
    private String musicid;


    @Override
    public String toString() {
        return "Favorite{" +
                "username='" + username + '\'' +
                ", musicid='" + musicid + '\'' +
                '}';
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMusicid() {
        return musicid;
    }

    public void setMusicid(String musicid) {
        this.musicid = musicid;
    }
}
