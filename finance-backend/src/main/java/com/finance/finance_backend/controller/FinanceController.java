package com.finance.finance_backend.controller;

import com.finance.finance_backend.entity.FinanceRecord;
import com.finance.finance_backend.service.FinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/finance")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FinanceController {

    private final FinanceService financeService;

    @GetMapping
    public ResponseEntity<List<FinanceRecord>> getAllRecords(
            @RequestParam(defaultValue = "date") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        return ResponseEntity.ok(financeService.getAllRecords(sortBy, sortDir));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FinanceRecord> getRecordById(
            @PathVariable Long id) {
        return ResponseEntity.ok(financeService.getRecordById(id));
    }

    @PostMapping
    public ResponseEntity<FinanceRecord> createRecord(
            @RequestBody FinanceRecord record) {
        return ResponseEntity.ok(financeService.createRecord(record));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FinanceRecord> updateRecord(
            @PathVariable Long id,
            @RequestBody FinanceRecord record) {
        return ResponseEntity.ok(financeService.updateRecord(id, record));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(
            @PathVariable Long id) {
        financeService.deleteRecord(id);
        return ResponseEntity.noContent().build();
    }
}