/**
 * NAMMA GYM - Dashboard Interactivity (Admin & User Portals)
 */

(function () {
  'use strict';

  function initUserDashboard() {
    const isUserDash = window.location.pathname.includes('user-dashboard.html');
    if (!isUserDash) return;

    // 1. Digital ID / QR Modal
    const showQrBtn = document.getElementById('btnShowQr');
    const qrModal = document.getElementById('qrModal');
    const closeQrBtn = document.getElementById('btnCloseQr');

    if (showQrBtn && qrModal) {
      showQrBtn.addEventListener('click', () => {
        qrModal.style.display = 'flex';
      });
    }
    if (closeQrBtn && qrModal) {
      closeQrBtn.addEventListener('click', () => {
        qrModal.style.display = 'none';
      });
    }

    // 2. Class Reservation Toggle
    document.querySelectorAll('.btn-reserve-class').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const row = btn.closest('.reservation-row');
        const badge = row ? row.querySelector('.res-status-badge') : null;

        if (btn.dataset.booked === 'true') {
          btn.dataset.booked = 'false';
          btn.innerHTML = '<i class="fa-solid fa-plus mr-1"></i> Book';
          btn.className = 'btn-reserve-class px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase transition-all';
          if (badge) {
            badge.className = 'res-status-badge px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400';
            badge.textContent = 'OPEN (4 LEFT)';
          }
          if (window.showToast) window.showToast('Reservation cancelled.', 'info', 'Schedule Updated');
        } else {
          btn.dataset.booked = 'true';
          btn.innerHTML = '<i class="fa-solid fa-check mr-1"></i> Booked';
          btn.className = 'btn-reserve-class px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase transition-all';
          if (badge) {
            badge.className = 'res-status-badge px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400';
            badge.textContent = 'CONFIRMED';
          }
          if (window.showToast) window.showToast('Spot reserved! See you in the cage/rig.', 'success', 'Class Booked');
        }
      });
    });

    // 3. Workout Set Logger Checkboxes
    document.querySelectorAll('.workout-set-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const item = cb.closest('.workout-set-item');
        if (cb.checked) {
          item.classList.add('opacity-40', 'line-through');
          if (window.showToast) window.showToast('Set logged to training history!', 'success', 'Progress Logged');
        } else {
          item.classList.remove('opacity-40', 'line-through');
        }
      });
    });
  }

  function initAdminDashboard() {
    const isAdminDash = window.location.pathname.includes('admin-dashboard.html');
    if (!isAdminDash) return;

    // 1. Live Member Filter & Search
    const searchInput = document.getElementById('adminMemberSearch');
    const statusFilter = document.getElementById('adminStatusFilter');
    const memberRows = document.querySelectorAll('.admin-member-row');

    function filterMembers() {
      const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const status = statusFilter ? statusFilter.value : 'all';

      memberRows.forEach(row => {
        const name = (row.querySelector('.member-name')?.textContent || '').toLowerCase();
        const id = (row.querySelector('.member-id')?.textContent || '').toLowerCase();
        const rowStatus = row.dataset.status || '';

        const matchQ = !q || name.includes(q) || id.includes(q);
        const matchStatus = status === 'all' || rowStatus === status;

        row.style.display = (matchQ && matchStatus) ? '' : 'none';
      });
    }

    if (searchInput) searchInput.addEventListener('input', filterMembers);
    if (statusFilter) statusFilter.addEventListener('change', filterMembers);

    // 2. Simulated Floor Check-in
    const btnSimCheckin = document.getElementById('btnSimulateCheckin');
    const currentCountEl = document.getElementById('liveFloorCount');
    if (btnSimCheckin && currentCountEl) {
      btnSimCheckin.addEventListener('click', () => {
        let val = parseInt(currentCountEl.textContent, 10) || 42;
        val += 1;
        currentCountEl.textContent = val;
        if (window.showToast) window.showToast(`Member NG-0941 checked in. Active floor: ${val} athletes.`, 'info', 'Gate Scan');
      });
    }

    // 3. Broadcast Alert Modal Simulator
    const btnBroadcast = document.getElementById('btnSendBroadcast');
    if (btnBroadcast) {
      btnBroadcast.addEventListener('click', () => {
        const msg = prompt('Enter emergency announcement or schedule update to broadcast to active members:');
        if (msg && msg.trim()) {
          if (window.showToast) window.showToast(`Broadcast published: "${msg.trim()}"`, 'success', 'Broadcast Live');
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initUserDashboard();
    initAdminDashboard();
  });

})();
