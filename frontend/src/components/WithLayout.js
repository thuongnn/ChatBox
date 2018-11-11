import React, {Component} from 'react';
import {Row, Col, Card} from 'antd';
import './WithLayout.css';

const WithLayout = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <Row>
                    <Col span={6}/>
                    <Col span={12}>
                        <Card className="content">
                            <Component {...this.props}/>
                        </Card>
                    </Col>
                    <Col span={6}/>
                </Row>
            )
        }
    }
};

export default WithLayout;
