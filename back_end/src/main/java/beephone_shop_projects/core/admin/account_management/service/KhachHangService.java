package beephone_shop_projects.core.admin.account_management.service;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.entity.Account;
import org.springframework.data.domain.Page;

public interface KhachHangService {
    Page<Account> getAllKH(Integer pageNo);
    Account addKH(CreateAccountRequest request);
    void doiTrangThai(String id);

    Account updateKH(Account request, String id);
//    Page<Account> search(Optional<String> tenSearch,Integer pageNo);
}
