package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "khuyen_mai")
public class KhuyenMai extends PrimaryEntity implements IsIdentified {

    private String ma;

    private String tenKhuyenMai;

    private BigDecimal mucGiamGiaTheoPhanTram;

    private BigDecimal mucGiamGiaTheoSoTien;

    private Date ngayBatDau;

    private Date ngayKetThuc;

    private String dieuKienGiamGia;

    private Boolean trangThai;
}
