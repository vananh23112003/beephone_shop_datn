package beephone_shop_projects.core.admin.account_management.service.impl;

import beephone_shop_projects.core.admin.account_management.model.request.DiaChiKhachHangRequest;
import beephone_shop_projects.core.admin.account_management.repository.AccountRepository;
import beephone_shop_projects.core.admin.account_management.repository.DiaChiRepository;
import beephone_shop_projects.core.admin.account_management.service.DiaChiService;
import beephone_shop_projects.entity.Account;
import beephone_shop_projects.entity.DiaChi;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class DiaChiServiceImpl implements DiaChiService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private DiaChiRepository diaChiRepository;

    @Override
    public List<DiaChi> getAllDiaChi(String id) {
        return diaChiRepository.getAllDiaChi(id);
    }

    @Override
    public DiaChi getOne(UUID id) {
        return diaChiRepository.findById(String.valueOf(id)).get();
    }

    @Override
    @Transactional
    public DiaChi addDiaChi(DiaChiKhachHangRequest diaChiKhachHangRequest, String id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));

        Integer newTrangThai = diaChiKhachHangRequest.getTrangThai();

        if (newTrangThai == null || newTrangThai != 1) {
            newTrangThai = 0;
        } else {
            for (DiaChi existingDiaChi : account.getDiaChiList()) {
                existingDiaChi.setTrangThai(0);
            }
        }

        DiaChi newDC = DiaChi.builder()
                .trangThai(newTrangThai)
                .tinhThanhPho(diaChiKhachHangRequest.getTinhThanhPho())
                .account(account)
                .xaPhuong(diaChiKhachHangRequest.getXaPhuong())
                .quanHuyen(diaChiKhachHangRequest.getQuanHuyen())
                .soDienThoaiKhachHang(diaChiKhachHangRequest.getSoDienThoaiKhachHang())
                .diaChi(diaChiKhachHangRequest.getDiaChi())
                .hoTenKH(diaChiKhachHangRequest.getHoTenKH())
                .build();

        DiaChi addedDiaChi = diaChiRepository.save(newDC);

        if (newTrangThai == 1) {
            diaChiRepository.updateTrangThaiAndAddDiaChi(addedDiaChi.getId(), newTrangThai, id);
        }

        return addedDiaChi;
    }

    @Override
    @Transactional
    public void doiTrangThai(String id, String account) {
        Account account1 = accountRepository.findById(account)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));

        for (DiaChi existingDiaChi : account1.getDiaChiList()) {
            if (existingDiaChi.getId().equals(id)) {
                existingDiaChi.setTrangThai(1);
            } else {
                existingDiaChi.setTrangThai(0);
            }
        }

        diaChiRepository.updateTrangThai(id, account);

    }


    @Override
    public void xoaDiaChi(String id) {
        diaChiRepository.deleteById(id);
    }

    @Override
    public DiaChi updateDiaChi(DiaChiKhachHangRequest diaChiKhachHangRequest, String id) {
        Optional<DiaChi> optional = diaChiRepository.findById(id);
        Integer newTrangThai = diaChiKhachHangRequest.getTrangThai();
        Account account = accountRepository.findById(diaChiKhachHangRequest.getAccount()).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy tài khoản"));

        if (newTrangThai == null || newTrangThai != 1) {
            newTrangThai = 0;
        } else {
            for (DiaChi existingDiaChi : account.getDiaChiList()) {
                existingDiaChi.setTrangThai(0);
            }
        }
        if (optional.isPresent()) {


            DiaChi diaChiToUpdate = optional.get();
            if (diaChiKhachHangRequest.getDiaChi() != null) {
                diaChiToUpdate.setDiaChi(diaChiKhachHangRequest.getDiaChi());
            }
            if (diaChiKhachHangRequest.getSoDienThoaiKhachHang() != null) {
                diaChiToUpdate.setSoDienThoaiKhachHang(diaChiKhachHangRequest.getSoDienThoaiKhachHang());
            }
            if (diaChiKhachHangRequest.getHoTenKH() != null) {
                diaChiToUpdate.setHoTenKH(diaChiKhachHangRequest.getHoTenKH());
            }
            if (diaChiKhachHangRequest.getTrangThai() != null) {
                diaChiToUpdate.setTrangThai(newTrangThai);
            }
            if (diaChiKhachHangRequest.getAccount() != null) {
                diaChiToUpdate.setAccount(accountRepository.findById(diaChiKhachHangRequest.getAccount()).orElse(null));
            }
            if (diaChiKhachHangRequest.getTinhThanhPho() != null) {
                diaChiToUpdate.setTinhThanhPho(diaChiKhachHangRequest.getTinhThanhPho());
            }
            if (diaChiKhachHangRequest.getXaPhuong() != null) {
                diaChiToUpdate.setXaPhuong(diaChiKhachHangRequest.getXaPhuong());
            }
            if (diaChiKhachHangRequest.getQuanHuyen() != null) {
                diaChiToUpdate.setQuanHuyen(diaChiKhachHangRequest.getQuanHuyen());
            }

            diaChiRepository.save(diaChiToUpdate);
            return diaChiToUpdate;
        }
        return null;
    }

    @Override
    public DiaChi getOneDiaChi(String id, String account) {
        return diaChiRepository.getOneDiaChi(id,account);
    }


    public static String getRandomSpecialChars(String[] specialCharsArray) {

        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 3; i++) {
            int randomIndex = random.nextInt(specialCharsArray.length);
            sb.append(specialCharsArray[randomIndex]);
        }

        return sb.toString();
    }

    public static String removeDiacritics(String str) {
        return Normalizer.normalize(str, Normalizer.Form.NFD).replaceAll("\\p{InCombiningDiacriticalMarks}+", "").replaceAll("[^\\p{Alnum}]+", "");
    }

}
