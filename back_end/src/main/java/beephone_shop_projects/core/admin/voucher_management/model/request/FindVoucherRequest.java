package beephone_shop_projects.core.admin.voucher_management.model.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;

@Getter
@Setter
public class FindVoucherRequest {

    private String ma;

    private String ten;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date ngayBatDau;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date ngayKetThuc;

    private BigDecimal dieuKienApDung;

    private BigDecimal giaTriToiThieu;

    private BigDecimal giaTriVoucher;

    private BigDecimal giaTriToiDa;

    private Integer soLuong;

    private Integer loaiVoucher;

    private Integer trangThai;

    private String keyword;

    private Integer pageNo;

    private Integer pageSize;

}
