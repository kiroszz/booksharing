package gdut.imis.domain;

public class List {

    private String username;
    private String listid;

    @Override
    public String toString() {
        return "List{" +
                "username='" + username + '\'' +
                ", listid='" + listid + '\'' +
                '}';
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getListid() {
        return listid;
    }

    public void setListid(String listid) {
        this.listid = listid;
    }
}
