'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProcessTable = undefined;

var _ProcessTaskButton;

function _load_ProcessTaskButton() {
  return _ProcessTaskButton = require('./ProcessTaskButton');
}

var _react = _interopRequireDefault(require('react'));

var _rxjsBundlesRxMinJs = require('rxjs/bundles/Rx.min.js');

var _Table;

function _load_Table() {
  return _Table = require('nuclide-commons-ui/Table');
}

var _AtomInput;

function _load_AtomInput() {
  return _AtomInput = require('nuclide-commons-ui/AtomInput');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * 
 * @format
 */

class ProcessTable extends _react.default.Component {

  constructor(props) {
    super(props);

    this._processesSubscription = null;
    this._handleFilterTextChange = this._handleFilterTextChange.bind(this);
    this._handleSort = this._handleSort.bind(this);

    this.state = {
      filterText: '',
      sortedColumn: 'cpuUsage',
      sortDescending: true
    };
  }

  componentDidMount() {
    this._processesSubscription = this.props.startFetchingProcesses();
  }

  componentWillUnmount() {
    if (this._processesSubscription != null) {
      this._processesSubscription.unsubscribe();
    }
  }

  _formatCpuUsage(cpu) {
    return cpu == null ? '' : cpu.toFixed(2) + '%';
  }

  _formatMemUsage(mem) {
    if (mem == null) {
      return '';
    } else if (mem < 1024) {
      return mem.toFixed(2) + 'K';
    } else {
      return (mem / 1024).toFixed(2) + 'M';
    }
  }

  _handleSort(sortedColumn, sortDescending) {
    this.setState({ sortedColumn, sortDescending });
  }

  _sortProcesses(processes, sortedColumnName, sortDescending) {
    if (sortedColumnName == null) {
      return processes;
    }
    // compare numerically the following fields
    const compare = ['cpuUsage', 'memUsage', 'pid', 'debug'].includes(sortedColumnName) ? (a, b, isAsc) => {
      const cmp = (a || Number.NEGATIVE_INFINITY) - (b || Number.NEGATIVE_INFINITY);
      return isAsc ? cmp : -cmp;
    } : (a, b, isAsc) => {
      const cmp = a.toLowerCase().localeCompare(b.toLowerCase());
      return isAsc ? cmp : -cmp;
    };

    return processes.sort((a, b) => compare(a[sortedColumnName], b[sortedColumnName], !sortDescending));
  }

  render() {
    const filterRegex = new RegExp(this.state.filterText, 'i');
    const rows = this._sortProcesses(this.props.processes.filter(item => filterRegex.test(item.user) || filterRegex.test(`${item.pid}`) || filterRegex.test(item.name)), this.state.sortedColumn, this.state.sortDescending).map(item => ({
      data: {
        pid: _react.default.createElement(
          'div',
          null,
          _react.default.createElement((_ProcessTaskButton || _load_ProcessTaskButton()).ProcessTaskButton, {
            icon: 'x',
            proc: item,
            taskType: 'KILL',
            nameIfManyTasks: 'Kill process',
            tasks: this.props.processTasks
          }),
          item.pid
        ),
        user: item.user,
        name: item.name,
        cpuUsage: this._formatCpuUsage(item.cpuUsage),
        memUsage: this._formatMemUsage(item.memUsage),
        debug: _react.default.createElement((_ProcessTaskButton || _load_ProcessTaskButton()).ProcessTaskButton, {
          icon: 'nuclicon-debugger',
          className: 'nuclide-device-panel-debug-button',
          proc: item,
          taskType: 'DEBUG',
          nameIfManyTasks: 'Debug process',
          tasks: this.props.processTasks
        })
      }
    }));
    const columns = [{
      key: 'pid',
      title: 'PID',
      width: 0.17
    }, {
      key: 'name',
      title: 'Name',
      width: 0.31
    }, {
      key: 'user',
      title: 'User',
      width: 0.13
    }, {
      key: 'cpuUsage',
      title: 'CPU',
      width: 0.15
    }, {
      key: 'memUsage',
      title: 'Mem',
      width: 0.15
    }, {
      key: 'debug',
      title: 'Debug',
      width: 0.08
    }];
    const emptyComponent = () => _react.default.createElement(
      'div',
      { className: 'padded' },
      'No information'
    );

    return _react.default.createElement(
      'div',
      null,
      _react.default.createElement((_AtomInput || _load_AtomInput()).AtomInput, {
        placeholderText: 'Filter process...',
        initialValue: this.state.filterText,
        onDidChange: this._handleFilterTextChange,
        size: 'sm'
      }),
      _react.default.createElement((_Table || _load_Table()).Table, {
        collapsable: false,
        columns: columns,
        maxBodyHeight: '99999px',
        emptyComponent: emptyComponent,
        rows: rows,
        sortable: true,
        onSort: this._handleSort,
        sortedColumn: this.state.sortedColumn,
        sortDescending: this.state.sortDescending,
        className: 'nuclide-device-panel-process-table'
      })
    );
  }

  _handleFilterTextChange(text) {
    this.setState({
      filterText: text
    });
  }
}
exports.ProcessTable = ProcessTable;