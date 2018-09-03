import React, { PureComponent } from 'react';
import Highlighter from 'react-highlight-words';
import classNames from 'classnames/bind';
import { AlertRule } from '../../types';

export interface Props {
  rule: AlertRule;
  search: string;
}

export default class AlertRuleItem extends PureComponent<Props, any> {
  toggleState = () => {
    // this.props.rule.togglePaused();
  };

  renderText(text: string) {
    return (
      <Highlighter
        highlightClassName="highlight-search-match"
        textToHighlight={text}
        searchWords={[this.props.search]}
      />
    );
  }

  render() {
    const { rule } = this.props;

    const stateClass = classNames({
      fa: true,
      'fa-play': rule.state === 'paused',
      'fa-pause': rule.state !== 'paused',
    });

    const ruleUrl = `${rule.url}?panelId=${rule.panelId}&fullscreen=true&edit=true&tab=alert`;

    return (
      <li className="alert-rule-item">
        <span className={`alert-rule-item__icon ${rule.stateClass}`}>
          <i className={rule.stateIcon} />
        </span>
        <div className="alert-rule-item__body">
          <div className="alert-rule-item__header">
            <div className="alert-rule-item__name">
              <a href={ruleUrl}>{this.renderText(rule.name)}</a>
            </div>
            <div className="alert-rule-item__text">
              <span className={`${rule.stateClass}`}>{this.renderText(rule.stateText)}</span>
              <span className="alert-rule-item__time"> for {rule.stateAge}</span>
            </div>
          </div>
          {rule.info && <div className="small muted alert-rule-item__info">{this.renderText(rule.info)}</div>}
        </div>

        <div className="alert-rule-item__actions">
          <button
            className="btn btn-small btn-inverse alert-list__btn width-2"
            title="Pausing an alert rule prevents it from executing"
            onClick={this.toggleState}
          >
            <i className={stateClass} />
          </button>
          <a className="btn btn-small btn-inverse alert-list__btn width-2" href={ruleUrl} title="Edit alert rule">
            <i className="icon-gf icon-gf-settings" />
          </a>
        </div>
      </li>
    );
  }
}
