package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "account")
public class Account extends PrimaryEntity implements IsIdentified {

    private String ma;

    private String hoVaTen;

    private String email;

    @Temporal(TemporalType.DATE)
    private Date ngaySinh;

    private String diaChi;

    private String matKhau;

    private String soDienThoai;

    private String xaPhuong;

    private String quanHuyen;

    private String tinhThanhPho;

    private Boolean gioiTinh;

    private String anhDaiDien;

    private String canCuocCongDan;

    private Integer trangThai;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_role")
    private Role idRole;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "account")
    private List<DiaChi> diaChiList;

}
