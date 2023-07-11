package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.AuditEntity;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "khuyen_mai_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
public class KhuyenMaiChiTiet extends AuditEntity implements Serializable {

    @EmbeddedId
    private KhuyenMaiChiTietId khuyenMaiChiTietId;

    private BigDecimal donGia;

    private BigDecimal donGiaSauKhuyenMai;


}
