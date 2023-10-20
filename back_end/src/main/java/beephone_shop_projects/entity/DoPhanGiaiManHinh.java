package beephone_shop_projects.entity;

import beephone_shop_projects.entity.base.IsIdentified;
import beephone_shop_projects.entity.base.PrimaryEntity;
import beephone_shop_projects.infrastructure.constant.ResolutionType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "do_phan_giai_man_hinh")
public class DoPhanGiaiManHinh extends PrimaryEntity implements IsIdentified {

  private String ma;

  private Double chieuDai;

  private Double chieuRong;

  @Enumerated(EnumType.ORDINAL)
  private ResolutionType resolutionType;

}