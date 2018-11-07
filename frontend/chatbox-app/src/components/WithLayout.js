import React, {Component} from 'react';
import {Row, Col} from 'antd';
import './WithLayout.css';

const WithLayout = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <Row>
                    <Col span={6}/>
                    <Col span={12}>
                        <div className="content">
                            <Component {...this.props}/>
                        </div>
                    </Col>
                    <Col span={6}/>
                </Row>
            )
        }
    }
};

export default WithLayout;
