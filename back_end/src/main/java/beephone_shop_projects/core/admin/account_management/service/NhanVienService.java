package beephone_shop_projects.core.admin.account_management.service;

import beephone_shop_projects.core.admin.account_management.model.request.CreateAccountRequest;
import beephone_shop_projects.entity.Account;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NhanVienService {
    Page<Account> getAllNV(Integer pageNo);
    List<Account> getAllNVienNoPage();
    Account addNV(CreateAccountRequest request);
    void doiTrangThai(String id);
    Account updateNV(CreateAccountRequest request,String id);
    Page<Account> search(Optional<String> tenSearch, Integer pageNo);
    Account getOne(UUID id);
}
