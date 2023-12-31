package beephone_shop_projects.core.admin.order_management.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SearchOrderDto {

  private String ma;

  private String tenNguoiNhan;

  private String soDienThoaiNguoiNhan;

  private String diaChiNguoiNhan;

  private BigDecimal tongTien;
}
