package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "gio_hang")
public class GioHang extends PrimaryEntity implements IsIdentified {

  private String ma;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "id_khach_hang")
  private Account account;

  @OneToMany(mappedBy = "gioHang", cascade = CascadeType.REMOVE)
  private List<GioHangChiTiet> cartDetails;

}
